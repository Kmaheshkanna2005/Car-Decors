const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        partId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Part",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "committed"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);