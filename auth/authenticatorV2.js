const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticatorV2 = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization == null) {
    return res.status(401).json({ error: "User Not Logged In" });
  }
  const token = authorization.replace("Bearer ", "");
  console.log(token);

  jwt.verify(token, "backend", async function (err, decoded) {
    console.log(decoded); // bar
    const user = await User.findOne({ _id: decoded.userId });
    if (user == null)
      return res.status(401).json({ error: "User Not Logged In" });
    else {
      req.user = user;
      next();
    }
  });
};
module.exports = authenticatorV2;
