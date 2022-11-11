const express = require("express");
const sellerAuthenticator = require("../auth/sellerAuthenticator");
const Product = require("../models/Product");
const {
  createProductService,
  readAllProductsService,
  readProductService,
  updateProductService,
  deleteProductService,
} = require("../services/productService");
const { createProductValidator } = require("../validators/productValidator");
const productRoutes = express.Router();

//Create Product
productRoutes.post(
  "/",
  sellerAuthenticator,
  createProductValidator,
  createProductService
);

//Read All
productRoutes.get("/all", sellerAuthenticator, readAllProductsService);

//Read One Product
productRoutes.get("/:id", sellerAuthenticator, readProductService);

//Update One Product
productRoutes.put(
  "/:id",
  sellerAuthenticator,
  createProductValidator,
  updateProductService
);

//Delete One Product
productRoutes.delete("/:id", sellerAuthenticator, deleteProductService);

module.exports = productRoutes;
