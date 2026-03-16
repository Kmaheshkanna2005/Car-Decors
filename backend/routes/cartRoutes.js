const express = require("express");
const router = express.Router();

const { addToCart, getCart, removeFromCart, commitCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/remove", protect, removeFromCart);
router.post("/commit", protect, commitCart);

module.exports = router;