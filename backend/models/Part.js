    const mongoose = require("mongoose");

    const partSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        trim: true,
        },
        category: {
        type: String,
        required: true,
        trim: true,
        },
        image: {
        type: String, // image file path
        required: true,
        },
        stock: {
        type: Number,
        required: true,
        min: 0,
        },
        price: {
        type: Number,
        default: 0,
        },
        createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
        lastStockUpdatedAt: {
        type: Date,
        default: Date.now,
        },
    },
    { timestamps: true }
    );

    module.exports = mongoose.model("Part", partSchema);
