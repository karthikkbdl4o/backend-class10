const express = require("express");
const {
  getLoggedInUser,
  updateLoggedInUser,
} = require("../services/userService");
const userAuthenticator = require("../auth/userAuthenticator");
const authenticatorV2 = require("../auth/authenticatorV2");

const userRoutes = express.Router();

userRoutes.get("/", userAuthenticator, getLoggedInUser);

userRoutes.put("/", userAuthenticator, updateLoggedInUser);

module.exports = userRoutes;
