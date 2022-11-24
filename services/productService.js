const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");

exports.createProductService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    seller: mongoose.Types.ObjectId(req.user._id),
  });
  await product.save();
  res.json({ message: "Product Saved Successfully" });
};

exports.sortReadAllProductsService = async (req, res) => {
  // Sort
  const products = await Product.find({
    seller: mongoose.Types.ObjectId(req.user._id),
  }).sort({ price: "desc" });
  res.json(products);
};

exports.paginatedReadAllProductsService = async (req, res) => {
  const page = parseInt(req.query.page ? req.query.page : 1);
  const size = parseInt(req.query.size ? req.query.size : 10);

  console.log(page + " " + size);

  // Sort
  const products = await Product.find({
    seller: mongoose.Types.ObjectId(req.user._id),
  })
    .limit(size)
    .skip(size * (page - 1))
    .sort({ name: "asc" });

  const totalElements = await Product.count({
    seller: mongoose.Types.ObjectId(req.user._id),
  });

  res.json({
    products,
    pagination: {
      page,
      size,
      totalElements,
    },
  });
};

exports.readAllProductsService = async (req, res) => {
  const products = await Product.find({
    seller: mongoose.Types.ObjectId(req.user._id),
  });
  res.json(products);
};

exports.readProductService = async (req, res) => {
  const product = await Product.findOne({
    _id: mongoose.Types.ObjectId(req.params.id),
    seller: mongoose.Types.ObjectId(req.user._id),
  });
  if (product == null)
    return res.status(404).json({ error: "Product Not Found" });
  res.json(product);
};

exports.updateProductService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const product = await Product.findOne({
    _id: mongoose.Types.ObjectId(req.params.id),
    seller: mongoose.Types.ObjectId(req.user._id),
  });
  if (product == null)
    return res.status(404).json({ error: "Product Not Found" });

  await Product.updateOne(
    {
      _id: mongoose.Types.ObjectId(req.params.id),
      seller: mongoose.Types.ObjectId(req.user._id),
    },
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    }
  );
  res.json({ message: "Update Successfull" });
};

exports.deleteProductService = async (req, res) => {
  const product = await Product.findOne({
    _id: mongoose.Types.ObjectId(req.params.id),
    seller: mongoose.Types.ObjectId(req.user._id),
  });
  if (product == null)
    return res.status(404).json({ error: "Product Not Found" });

  await Product.deleteOne({
    _id: mongoose.Types.ObjectId(req.params.id),
    seller: mongoose.Types.ObjectId(req.user._id),
  });

  res.json({ message: "Deleted Successfully" });
};
