const e = require("express");
const express = require("express");
const userAuthenticator = require("../auth/userAuthenticator");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

const shopRoutes = express.Router();

//Create Cart Item
shopRoutes.post("/cart", userAuthenticator, async (req, res) => {
  console.log(req.user);

  const product = await Product.findOne({ _id: req.body.productId });
  if (product == null)
    return res.status(404).json({ error: "Product Not Found" });

  const already = await CartItem.findOne({
    user: req.user._id,
    product: product._id,
  });
  if (already != null) {
    await CartItem.updateOne(
      {
        user: req.user._id,
        product: product._id,
      },
      {
        quantity: req.body.quantity,
      }
    );
  } else {
    const cartItem = new CartItem({
      user: req.user._id,
      product: product._id,
      quantity: req.body.quantity,
    });
    await cartItem.save();
  }

  res.json({ message: "Successfully Saved" });
});
shopRoutes.get("/cart", userAuthenticator, async (req, res) => {
  const cartItems = await CartItem.find({
    user: req.user._id,
  }).populate("product");
  res.json(cartItems);
});
shopRoutes.delete("/cart/:id", userAuthenticator, async (req, res) => {
  const cartItem = await CartItem.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (cartItem == null) {
    return res.status(404).json("Cart Item Not Found");
  }
  await CartItem.deleteOne({ _id: cartItem._id });
  res.json({ message: "Deleted Successfully" });
});

module.exports = shopRoutes;
