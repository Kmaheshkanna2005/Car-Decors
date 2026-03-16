const express = require("express");
const router = express.Router();

const { generateUsageReport ,getUsageHistory} = require("../controllers/reportController");
const { protect , adminOnly} = require("../middleware/authMiddleware");

router.get("/usage", protect, generateUsageReport);
router.get("/history", protect, adminOnly, getUsageHistory);
module.exports = router;