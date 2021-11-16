const jwt = require("jsonwebtoken");

const config = require("../config/config");
const validation = require("../middlewares/validation");
const UserService = require("../services/user.service");

exports.register = [
  validation.validateUsername,
  validation.validateEmail,
  validation.validatePassword,
  //validation.validatePasswordMatch,
  // eslint-disable-next-line no-unused-vars
  async (req, res, next) => {
    try {
      console.log("req.body: ", req.body);
      const validationErrors = validation.validationResult(req);
      console.log("validationErrors: ", validationErrors);
      const errors = [];
      if (!validationErrors.isEmpty()) {
        validationErrors.errors.forEach((error) => {
          errors.push(error.msg);
          req.session.messages.push({
            text: error.msg,
            type: "danger",
          });
        });
        console.log("errors: ", errors);
      } else {
        const existingEmail = await UserService.findByEmail(req.body.email);
        const existingUsername = await UserService.findByUsername(
          req.body.username
        );

        if (existingEmail || existingUsername) {
          errors.push("email already exits");
          errors.push("username already exists");
          req.session.messages.push({
            text: "The given email address or the username exist already!",
            type: "danger",
          });
          return res.status(500).send(errors);
        }
      }
      if (errors.length) {
        return res.status(500).send(errors);
      }
      const savedUser = await UserService.createUser(
        req.body.username,
        req.body.email,
        req.body.password
      );
      req.session.messages.push({
        text: "Your account was created!",
        type: "success",
      });
      jwt.sign(
        {
          id: savedUser._id,
          email: savedUser.email,
          verified: savedUser.verified,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        },
        (err, token) => {
          if (err) {
            return res.status(500).send(err);
          }
          return res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.log("err: ", err);
      return res.status(500).send(err);
    }
  },
];

// eslint-disable-next-line no-unused-vars
exports.login = async (req, res, next) => {
  try {
    console.log(`at auth.controller login:`);
    req.session.messages.push({
      text: "You are logged in now!",
      type: "success",
    });
    if (req.body.remember) {
      req.sessionOptions.maxAge = 24 * 60 * 60 * 1000 * 14;
      req.session.rememberme = req.sessionOptions.maxAge;
    } else {
      req.session.rememberme = null;
    }
    const user = await UserService.findByEmail(req.body.email);
    const token = jwt.sign(
      {
        userId: user._id,
      },
      config.jwt_secret,
      { expiresIn: "24h" }
    );
    res
      .status(200)
      .json({ id: user.id, status: "You are logged in now!", jwt: token });
  } catch (err) {
    console.log("err: ", err);
    return res.status(500).send(err);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    console.log(`at auth.controller verifyToken: userid ${token}`);
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.jwt_secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    return next(err);
  }
};

exports.getToken = async (req, res, next) => {
  try {
    console.log(`at auth.controller getToken: userid ${req.user}`);
    if (req.user == null) {
      const errors = [];
      errors.push("user should loggedin");
      req.session.messages.push({
        text: "User needed !",
        type: "danger",
      });
      return res.status(500).send(errors);
    }
    const token = jwt.sign(
      {
        userId: req.user.id,
      },
      config.jwt_secret,
      { expiresIn: "24h" }
    );
    return res.json({ jwt: token });
  } catch (err) {
    return next(err);
  }
};

exports.currentUser = (req, res, next) => {
  try {
    console.log(`at auth.controller currentUser: userid ${req.user}`);
    if (req.user == null) {
      const errors = [];
      errors.push("user should loggedin");
      req.session.messages.push({
        text: "User needed !",
        type: "danger",
      });
      return res.status(500).send(errors);
    }
    return res.json({
      username: req.user.username,
    });
  } catch (err) {
    console.log("err: ", err);
    return res.status(500).send(err);
  }
};

exports.logout = (req, res, next) => {
  try {
    req.logout();
    req.session.rememberme = null;
    req.session.messages.push({
      text: "You are logged out now!",
      type: "info",
    });
    res.status(200).json({ status: "You are logged out now!" });
  } catch (err) {
    console.log("err: ", err);
    return res.status(500).send(err);
  }
};
