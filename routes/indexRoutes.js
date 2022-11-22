const express = require("express");
const { signupValidator } = require("../validators/indexValidator");
const {
  signupService,
  loginService,
  signUpSellerService,
} = require("../services/indexService");
const userAuthenticator = require("../auth/userAuthenticator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const indexRoutes = express.Router();

indexRoutes.post("/signup", signupValidator, signupService);

indexRoutes.post("/signUpSeller", signupValidator, signUpSellerService);

indexRoutes.post("/login", userAuthenticator, loginService);

indexRoutes.post("/login/v2", async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({ email: req.body.email });
  if (user == null) {
    return res.status(401).json({ error: "User Not Signed Up" });
  }

  const isValid = await bcrypt
    .compare(req.body.password, user.password)
    .then((result) => {
      return result;
    });

  if (isValid) {
    //Create jwt token
    const token = jwt.sign({ userId: user._id }, "backend");

    res.json({
      message: "Login Successfull",
      token,
    });
  } else res.status(401).json({ error: "User Password Incorrect" });
});

module.exports = indexRoutes;
