const { MongoClient } = require("mongodb");
const config = require("./config");

const atlas_db =
  "mongodb+srv://" +
  config.db.user +
  ":" +
  config.db.password +
  "@" +
  config.db.host +
  "/" +
  config.db.database +
  "?retryWrites=true&w=majority";

let client;

exports.initializeMongoClient = async () => {
  client = await MongoClient.connect(atlas_db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

exports.getMongoClient = () => {
  const db = client.db(config.db.database);
  return db;
};
