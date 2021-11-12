const dotenv = require("dotenv");
const path = require("path");

const env = process.env;
dotenv.config({
  path: path.resolve(__dirname, env.NODE_ENV + ".env"),
});

console.log("env: " + env.NODE_ENV);

const config = {
  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: env.DB_CONN_LIMIT,
    queueLimit: 0,
    debug: env.DB_DEBUG,
  },
  listPerPage: env.LIST_PER_PAGE,
  host: env.HOST,
  port: env.PORT,
  jwt_secret: env.JWT_SECRET,
  allowList: env.ALLOW_LIST.split(","),
  mediaPath: env.MEDIA_PATH,
};

module.exports = config;
