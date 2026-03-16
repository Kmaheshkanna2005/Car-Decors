const Cart = require("../models/Cart");
const Part = require("../models/Part");
const Usage = require("../models/Usage");
// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { partId, quantity } = req.body;
    const staffId = req.user._id;

    let cart = await Cart.findOne({ staffId, status: "active" });

    if (!cart) {
      cart = await Cart.create({
        staffId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.partId.toString() === partId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ partId, quantity });
    }

    await cart.save();

    res.json({
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// View cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      staffId: req.user._id,
      status: "active",
    }).populate("items.partId");

    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { partId } = req.body;

    const cart = await Cart.findOne({
      staffId: req.user._id,
      status: "active",
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.partId.toString() !== partId
    );

    await cart.save();

    res.json({
      message: "Item removed",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Commit cart
const commitCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      staffId: req.user._id,
      status: "active",
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Validate stock
    for (const item of cart.items) {
      const part = await Part.findById(item.partId);

      if (!part || part.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${part.name}`,
        });
      }
    }

    // Reduce stock
    for (const item of cart.items) {
      const part = await Part.findById(item.partId);

      part.stock -= item.quantity;
      part.lastStockUpdatedAt = new Date();

      await part.save();
    }

    // Save usage history
    await Usage.create({
      staffId: req.user._id,
      partsUsed: cart.items,
    });

    // Close cart
    cart.status = "committed";
    await cart.save();

    res.json({
      message: "Cart committed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addToCart, getCart, removeFromCart, commitCart };