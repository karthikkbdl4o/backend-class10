const { Schema, default: mongoose } = require("mongoose");

const schema = new Schema({
  address: String,
  city: String,
  pincode: String,
  state: String,
  userId: String,
  // userId: {
  //   type: mongoose.ObjectId,
  //   ref: "User",
  // },
});

const Address = mongoose.model("Address", schema);

module.exports = Address;
