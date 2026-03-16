const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const { addPart, getParts, increaseStock, deletePart , getLowStockParts ,updatePart,setStock } = require("../controllers/partController");

const upload = require("../middleware/uploadMiddleware");

// ➕ Add part
router.post("/", protect, adminOnly, upload.single("image"), addPart);

// 📦 View parts
router.get("/", protect, getParts);

// ➕ Increase stock
router.patch("/:id/increase", protect, adminOnly, increaseStock);

// ❌ Delete part
router.delete("/:id", protect, adminOnly, deletePart);

router.get("/low-stock", protect, adminOnly, getLowStockParts);

router.put("/:id", protect, adminOnly, upload.single("image"), updatePart);

router.patch("/:id/set-stock", protect, adminOnly, setStock);

module.exports = router;