const User = require("../models/User");
const bcrypt = require("bcrypt");
const authenticator = require("./authenticator");
const { model } = require("mongoose");
const authenticatorV2 = require("./authenticatorV2");

const sellerAuthenticator = [
  authenticatorV2,
  (req, res, next) => {
    if (req.user.userType == "SELLER") {
      next();
    } else {
      res.status(401).json({ error: "User Does Not Have Access" });
    }
  },
];
module.exports = sellerAuthenticator;
