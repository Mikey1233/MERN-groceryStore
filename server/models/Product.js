const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productDescription: {type: String,require: true},
    Amount: { type: Number, required: true },
    OfferAmount: { type: Number },
    productImage: {
      type: [String], // <-- changed here
      default: [],
      required : true    // <-- optional default
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 👈 assumes you have a User model
      required: true,
    },
    category: {
      type: String,
      enum: ["fruit","vegetable","drink","dairy","bakery","grain"],
      default: "",
    },  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);
