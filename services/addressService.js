const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const Address = require("../models/Address");

exports.createAddressService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const address = new Address({
    address: req.body.address,
    city: req.body.city,
    pincode: req.body.pincode,
    state: req.body.state,
    user: mongoose.Types.ObjectId(req.user._id),
  });
  await address.save();

  res.json({ message: "Address Saved" });
};

exports.readAllAddresses = async (req, res) => {
  const addresses = await Address.find({
    user: mongoose.Types.ObjectId(req.user._id),
  });
  res.json(addresses);
};

exports.readAddress = async (req, res) => {
  const id = req.params.id;

  const address = await Address.findOne({
    _id: mongoose.Types.ObjectId(id),
  });

  if (address == null)
    return res.status(404).json({ error: "Address Not Found" });
  res.json(address);
};

exports.updateAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;

  const address = await Address.findOne({
    _id: mongoose.Types.ObjectId(id),
    user: mongoose.Types.ObjectId(req.user._id),
  });
  if (address == null)
    return res.status(404).json({ error: "Address Not Found" });

  await Address.updateOne(
    {
      _id: mongoose.Types.ObjectId(id),
      user: mongoose.Types.ObjectId(req.user._id),
    },
    {
      address: req.body.address,
      city: req.body.city,
      pincode: req.body.pincode,
      state: req.body.state,
    }
  );

  res.json({ message: "Address Update" });
};

exports.deleteAddress = async (req, res) => {
  const id = req.params.id;

  const address = await Address.findOne({
    _id: mongoose.Types.ObjectId(id),
    user: mongoose.Types.ObjectId(req.user._id),
  });
  if (address == null)
    return res.status(404).json({ error: "Address Not Found" });

  await Address.deleteOne({
    _id: mongoose.Types.ObjectId(id),
    user: mongoose.Types.ObjectId(req.user._id),
  });
  res.json({ message: "Address Deleted" });
};
