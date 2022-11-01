const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors });
  }

  const passwordHash = await bcrypt
    .hash(req.body.password, 10)
    .then((result) => result);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: passwordHash,
  });

  await user.save();

  res.json({ message: "Signup Successful" });
};

exports.login = async (req, res) => {
  const encoded = req.headers.authorization.split(" ")[1];

  const decode = atob(encoded);

  const splitDecode = decode.split(":");
  const email = splitDecode[0];
  const password = splitDecode[1];

  const user = await User.findOne({ email });
  if (user == null) {
    return res.status(401).json({ error: "User Not Signed Up" });
  }

  const isValid = await bcrypt
    .compare(password, user.password)
    .then((result) => {
      return result;
    });

  if (isValid) {
    res.json({ message: "Successful" });
  } else {
    res.status(401).json({ error: "Invalid Password" });
  }
};
