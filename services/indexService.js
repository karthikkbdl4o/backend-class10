const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signupService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const hash = await bcrypt.hash(req.body.password, 10).then((result) => {
    return result;
  });

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
  });

  await user.save();
  return res.json({ message: "Signed Up" });
};

exports.loginService = async (req, res) => {
  res.json(req.user);
};
exports.signUpSellerService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const hash = await bcrypt.hash(req.body.password, 10).then((result) => {
    return result;
  });

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
    userType: "SELLER",
  });

  await user.save();
  return res.json({ message: "Signed Up As Seller" });
};
