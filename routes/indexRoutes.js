const express = require("express");
const { signupValidator } = require("../validators/indexValidator");
const {
  signupService,
  loginService,
  signUpSellerService,
} = require("../services/indexService");
const userAuthenticator = require("../auth/userAuthenticator");

const indexRoutes = express.Router();

indexRoutes.post("/signup", signupValidator, signupService);

indexRoutes.post("/signUpSeller", signupValidator, signUpSellerService);

indexRoutes.post("/login", userAuthenticator, loginService);

module.exports = indexRoutes;
