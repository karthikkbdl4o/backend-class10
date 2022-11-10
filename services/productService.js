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
