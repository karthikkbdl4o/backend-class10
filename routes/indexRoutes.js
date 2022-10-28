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
    .withMessage("Email Invalid"),
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

module.exports = indexRoutes;
