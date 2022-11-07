const { body } = require("express-validator");
const User = require("../models/User");

exports.signupValidator = [
  body("firstName").exists().withMessage("First Name Not Found"),
  body("lastName").exists().withMessage("Last Name Not Found"),
  body("email")
    .exists()
    .withMessage("Email Not Found")
    .isEmail()
    .withMessage("Email Invalid")
    .custom((email) => {
      return User.findOne({ email: email }).then((user) => {
        if (user != null) {
          return Promise.reject("User Already Exists");
        }
      });
    }),
  body("password")
    .exists()
    .withMessage("Password Not Found")
    .isStrongPassword()
    .withMessage("Password Invalid"),
];
