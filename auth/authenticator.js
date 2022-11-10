const User = require("../models/User");
const bcrypt = require("bcrypt");

const authenticator = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization == null) {
    return res.status(401).json({ error: "User Not Logged In" });
  }
  const encoded = authorization.replace("Basic ", "");
  const decodedArray = atob(encoded).split(":");
  if (decodedArray.length != 2) {
    return res.status(401).json({ error: "User Not Logged In" });
  }
  const email = decodedArray[0];
  const password = decodedArray[1];

  const user = await User.findOne({ email: email });
  if (user == null) {
    return res.status(401).json({ error: "User Not Signed Up" });
  }

  const isValid = await bcrypt
    .compare(password, user.password)
    .then((result) => {
      return result;
    });

  if (isValid) {
    const temp = JSON.parse(JSON.stringify(user));
    delete temp.password;
    req.user = temp;
    next();
  } else res.status(401).json({ error: "User Password Not Found" });
};
module.exports = authenticator;
