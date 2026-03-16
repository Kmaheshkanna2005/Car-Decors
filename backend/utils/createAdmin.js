const User = require("../models/User");

const createDefaultAdmin = async () => {
  const adminExists = await User.findOne({ role: "admin" });

  if (!adminExists) {
    await User.create({
      name: "Owner",
      mobile: "9999999999",   // change this later
      password: "admin123",   // change this later
      role: "admin",
    });

    console.log("✅ Default admin created");
  }
};

module.exports = createDefaultAdmin;
