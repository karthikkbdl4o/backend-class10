const User = require("../models/User");
const bcrypt = require("bcrypt");
const authenticator = require("./authenticator");
const { model } = require("mongoose");
const authenticatorV2 = require("./authenticatorV2");

const userAuthenticator = [
  authenticatorV2,
  (req, res, next) => {
    console.log(req.user);
    if (req.user.userType == "USER") {
      next();
    } else {
      res.status(401).json({ error: "User Does Not Have Access" });
    }
  },
];
module.exports = userAuthenticator;
