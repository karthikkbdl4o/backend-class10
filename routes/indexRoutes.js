const express = require("express");
const indexRoutes = express.Router();

const { signup, login } = require("../services/indexService");
const { signupValidator } = require("../validators/indexValidator");

indexRoutes.post("/signup", signupValidator, signup);

indexRoutes.post("/login", login);

module.exports = indexRoutes;
