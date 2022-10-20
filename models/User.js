const { Schema, mongoose } = require("mongoose");

const schema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  userType: {
    type: String,
    isIn: ["USER", "SELLER"],
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
