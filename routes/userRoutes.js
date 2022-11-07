const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getLoggedInUser } = require("../services/userService");
const userAuthenticator = require("../auth/userAuthenticator");

const userRoutes = express.Router();

userRoutes.get("/", userAuthenticator, getLoggedInUser);

module.exports = userRoutes;
