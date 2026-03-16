const Part = require("../models/Part");
const User = require("../models/User");
const Usage = require("../models/Usage");

const getDashboardStats = async (req, res) => {
  try {
    // Total parts
    const totalParts = await Part.countDocuments();

    // Total staff
    const totalStaff = await User.countDocuments({ role: "staff" });

    // Total stock
    const parts = await Part.find();
    const totalStock = parts.reduce((sum, part) => sum + part.stock, 0);

    // Today's usage
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayUsage = await Usage.countDocuments({
      createdAt: { $gte: today },
    });

    res.json({
      totalParts,
      totalStock,
      totalStaff,
      todayUsage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardStats };