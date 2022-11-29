const express = require("express");
const sellerAuthenticator = require("../auth/sellerAuthenticator");
const Product = require("../models/Product");
const {
  createProductService,
  readAllProductsService,
  readProductService,
  updateProductService,
  deleteProductService,
  sortReadAllProductsService,
  paginatedReadAllProductsService,
  searchProductService,
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

productRoutes.get("/sort", sellerAuthenticator, sortReadAllProductsService);

productRoutes.get(
  "/paginated",
  sellerAuthenticator,
  paginatedReadAllProductsService
);

productRoutes.get("/search", searchProductService);

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
