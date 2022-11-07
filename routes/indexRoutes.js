const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { signupValidator } = require("../validators/indexValidator");
const { signupService, loginService } = require("../services/indexService");

const indexRoutes = express.Router();

indexRoutes.post("/signup", signupValidator, signupService);

indexRoutes.post("/login", loginService);

module.exports = indexRoutes;
