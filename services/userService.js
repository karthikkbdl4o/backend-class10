const User = require("../models/User");

exports.getLoggedInUser = async (req, res) => {
  res.json(req.user);
};
exports.updateLoggedInUser = async (req, res) => {
  await User.updateOne(
    { email: req.user.email },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }
  );

  res.json({ message: "Update User" });
};
