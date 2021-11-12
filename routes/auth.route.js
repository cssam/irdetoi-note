const express = require("express");
const passport = require("passport");

const router = express.Router();
const auth_controller = require("../controllers/auth.controller");

router.post("/register", auth_controller.register);

router.post(
  "/login",
  //passport.authenticate("local", { session: false }),
  auth_controller.login
);

router.get(
  "/currentUser",
  passport.authenticate("jwt", { session: false }),
  auth_controller.currentUser
);

router.get("/logout", auth_controller.logout);

module.exports = router;
