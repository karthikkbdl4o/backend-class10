const express = require("express");
const { default: mongoose } = require("mongoose");
const userAuthenticator = require("../auth/userAuthenticator");
const Address = require("../models/Address");
const {
  createAddressService,
  readAllAddresses,
  readAddress,
  updateAddress,
  deleteAddress,
} = require("../services/addressService");
const { createAddressValidator } = require("../validators/addressValidator");
const addressRoutes = express.Router();

//Create Address
addressRoutes.post(
  "/",
  userAuthenticator,
  createAddressValidator,
  createAddressService
);

//Read All Addresses
addressRoutes.get("/all", userAuthenticator, readAllAddresses);

//Read Address
addressRoutes.get("/:id", readAddress);

//Update Address
addressRoutes.put(
  "/:id",
  userAuthenticator,
  createAddressValidator,
  updateAddress
);

//Delete Address
addressRoutes.delete("/:id", userAuthenticator, deleteAddress);

module.exports = addressRoutes;
