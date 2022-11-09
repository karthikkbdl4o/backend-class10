const { Schema, default: mongoose } = require("mongoose");

const schema = new Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", schema);

module.exports = Address;
