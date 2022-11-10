const express = require("express");
const sellerAuthenticator = require("../auth/sellerAuthenticator");
const Product = require("../models/Product");
const { createProductService } = require("../services/productService");
const { createProductValidator } = require("../validators/productValidator");
const productRoutes = express.Router();

//Create Product
productRoutes.post(
  "/",
  sellerAuthenticator,
  createProductValidator,
  createProductService
);

module.exports = productRoutes;
