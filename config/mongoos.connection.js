const mongoose = require("mongoose");
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
let connection;

exports.getMongooseConnect = function () {
  mongoose.connect(atlas_db);
  connection = mongoose.connection;
  connection.on(
    "error",
    console.error.bind(console, "Mongoose connection error:")
  );
};
