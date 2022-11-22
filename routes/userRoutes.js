const express = require("express");
const {
  getLoggedInUser,
  updateLoggedInUser,
} = require("../services/userService");
const userAuthenticator = require("../auth/userAuthenticator");
const authenticatorV2 = require("../auth/authenticatorV2");

const userRoutes = express.Router();

userRoutes.get("/", authenticatorV2, getLoggedInUser);

userRoutes.put("/", authenticatorV2, updateLoggedInUser);

module.exports = userRoutes;
