const express = require("express");
const { body, validationResult } = require("express-validator");
const indexRoutes = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

indexRoutes.post(
  "/signup",
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors });
    }

    const passwordHash = await bcrypt
      .hash(req.body.password, 10)
      .then((result) => result);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordHash,
    });

    await user.save();

    res.json({ message: "Signup Successful" });
  }
);

indexRoutes.post("/login", async (req, res) => {
  console.log(req.headers.authorization);

  const authorization = req.headers.authorization;

  const encoded = authorization.split(" ")[1];

  const decoded = atob(encoded);
  const split = decoded.split(":");
  const email = split[0];
  const password = split[1];

  //Get User
  const user = await User.findOne({ email: email });

  if (user == null) {
    return res.status(401).json({ error: "User Not Signed Up" });
  }

  const isValid = await bcrypt
    .compare(password, user.password)
    .then((result) => result);

  console.log(isValid);

  if (isValid) {
    res.json({ message: "Successful" });
  } else {
    res.status(401).json({ error: "Invalid Password" });
  }
});

module.exports = indexRoutes;
