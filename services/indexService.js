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
  const authorization = req.headers.authorization;
  const encoded = authorization.replace("Basic ", "");
  const decodedArray = atob(encoded).split(":");
  const email = decodedArray[0];
  const password = decodedArray[1];

  console.log(email);
  console.log(password);

  const user = await User.findOne({ email: email });
  if (user == null) {
    return res.status(401).json({ message: "User UnAuth" });
  }

  const isValid = await bcrypt
    .compare(password, user.password)
    .then((result) => {
      return result;
    });

  if (isValid) {
    res.json({ messsage: "Login Successfull" });
  } else {
    return res.status(401).json({ message: "User UnAuth" });
  }
};
