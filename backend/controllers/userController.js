const User = require("../models/User");

// Create Staff
const createStaff = async (req, res) => {
  try {
    const { name, mobile, password } = req.body;

    if (!name || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const staff = await User.create({
      name,
      mobile,
      password,
      role: "staff",
    });

    res.status(201).json({
      message: "Staff created successfully",
      userId: staff._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete staff
const deleteStaff = async (req, res) => {
  try {

    const { id } = req.params;

    const staff = await User.findById(id);

    if (!staff || staff.role !== "staff") {
      return res.status(404).json({ message: "Staff not found" });
    }

    await User.findByIdAndDelete(id);

    res.json({ message: "Staff deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all staff
const getStaff = async (req, res) => {
  try {

    const staff = await User.find({ role: "staff" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(staff);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Create Admin
const createAdmin = async (req, res) => {
  try {
    const { name, mobile, password } = req.body;

    if (!name || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const admin = await User.create({
      name,
      mobile,
      password,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin created successfully",
      userId: admin._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createStaff,
  createAdmin,
  getStaff,
  deleteStaff
};