//1.  Setup load modules
const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const logger = require("morgan");

const app = express();
const config = require("./config/config");
const { getMongooseConnect } = require("./config/mongoos.connection");
//const { initializeMongoClient } = require("./config/mongodb.connection");
const setupPassport = require("./lib/passport");

const allowList = config.allowList;

console.log(allowList);
const corsOptionsDelegate = function (req, callback) {
  const header_origin = req.header("Origin");
  //console.log("header_origin: " + header_origin);
  let corsOptions;
  if (allowList.indexOf(header_origin) !== -1) {
    corsOptions = { origin: header_origin }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// connect to database
getMongooseConnect();
//initializeMongoClient();

// Initialize session management with cookie-session
app.use(
  session({
    name: "session",
    keys: ["irdetoi"],
    resave: false,
    saveUninitialized: true,
    sameSite: "lax",
    maxAge: null,
  })
);
// body parser middleware
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(logger("dev"));

//passport setup
const passport = setupPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(async (req, res, next) => {
  req.sessionOptions.maxAge =
    req.session.rememberme || req.sessionOptions.maxAge;
  res.locals.user = req.user;
  return next();
});
app.use(async (req, res, next) => {
  // Set up flash messaging
  if (!req.session.messages) {
    req.session.messages = [];
  }
  res.locals.messages = req.session.messages;
  return next();
});

//routes
const noteRoute = require("./routes/note.route");
const authRoute = require("./routes/auth.route");

app.use("/noteAPI", cors(corsOptionsDelegate), noteRoute);
app.use("/authAPI", authRoute);

// set port, listen for requests
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on ${port}.`);
});

module.exports = app;
