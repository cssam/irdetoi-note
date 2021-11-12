const { body, validationResult, check } = require("express-validator");

module.exports.validatePassword = body("password")
  .isLength({ min: 8 })
  .trim()
  .withMessage("The password has to be at least 8 characters long.");

module.exports.validatePasswordMatch = body("password")
  .custom((value, { req }) => {
    if (value !== req.body.confirmPassword) {
      return false;
    }
    return true;
  })
  .withMessage("Passwords don't match");

module.exports.validateEmail = body("email")
  .isEmail()
  .normalizeEmail()
  .withMessage("Please enter a valid email address.");

module.exports.validateUsername = body("username")
  .isLength({ min: 6 })
  .trim()
  .withMessage("The username has to be at least 6 characters long.");

module.exports.validationResult = validationResult;

module.exports.registrationValidation = [
  check("username", "username is requied").not().isEmpty(),
  check("email", "Please include a valid email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password must be 6 or more characters").isLength({
    min: 6,
  }),
];
