const express = require("express");
const router = express.Router();

const { createStaff, createAdmin , getStaff , deleteStaff} = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin creates staff
router.post("/staff", protect, adminOnly, createStaff);
router.get("/staff", protect, adminOnly, getStaff);
router.delete("/staff/:id", protect, adminOnly, deleteStaff);

// Admin creates another admin
router.post("/admin", protect, adminOnly, createAdmin);

module.exports = router;