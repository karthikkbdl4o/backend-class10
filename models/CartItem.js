const { Schema, default: mongoose } = require("mongoose");

const schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const CartItem = mongoose.model("CartItem", schema);
module.exports = CartItem;
