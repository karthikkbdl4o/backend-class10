const { body } = require("express-validator");
const User = require("../models/User");

exports.signupValidator = [
  body("firstName").exists().withMessage("First Name Needed"),

  body("lastName").exists().withMessage("Last Name Needed"),

  body("email")
    .exists()
    .withMessage("Email Needed")
    .isEmail()
    .withMessage("Email Invalid")
    .custom((email) => {
      return User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject("Email Already in use");
        }
      });
    }),

  body("password")
    .exists()
    .withMessage("Password Needed")
    .isStrongPassword()
    .withMessage("Password Invalid"),
];
