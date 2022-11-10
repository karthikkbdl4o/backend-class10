const User = require("../models/User");
const bcrypt = require("bcrypt");
const authenticator = require("./authenticator");
const { model } = require("mongoose");

const userAuthenticator = [
  authenticator,
  (req, res, next) => {
    if (req.user.userType == "USER") {
      next();
    } else {
      res.status(401).json({ error: "User Does Not Have Access" });
    }
  },
];
module.exports = userAuthenticator;
