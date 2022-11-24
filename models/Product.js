const { Schema, default: mongoose } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", schema);
module.exports = Product;
