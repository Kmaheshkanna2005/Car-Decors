  const Part = require("../models/Part");


  // 📦 Get all parts
  const getParts = async (req, res) => {
    try {
      const parts = await Part.find().sort({ createdAt: -1 });

      res.json(parts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  // ➕ Add new part (Admin only)
  const addPart = async (req, res) => {
    try {
      const { name, category, stock, price } = req.body;

      if (!name || !category || !stock || !req.file) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const part = await Part.create({
        name,
        category,
        stock,
        price,
        image: req.file.path,
        createdBy: req.user._id,
      });

      res.status(201).json({
        message: "Part added successfully",
        part,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  const deletePart = async (req, res) => {
    try {
      const { id } = req.params;

      const part = await Part.findById(id);

      if (!part) {
        return res.status(404).json({ message: "Part not found" });
      }

      await Part.findByIdAndDelete(id);

      res.json({ message: "Part deleted successfully" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  // ➕ Admin increase stock
  const increaseStock = async (req, res) => {
    try {
      const { quantity } = req.body;
      const { id } = req.params;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: "Valid quantity required" });
      }

      const part = await Part.findById(id);

      if (!part) {
        return res.status(404).json({ message: "Part not found" });
      }

      part.stock += Number(quantity);
      part.lastStockUpdatedAt = new Date();

      await part.save();

      res.json({
        message: "Stock increased successfully",
        updatedStock: part.stock,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  // ⚠ Get low stock parts
  const getLowStockParts = async (req, res) => {
    try {
      const threshold = 5; // minimum stock limit

      const parts = await Part.find({ stock: { $lt: threshold } });

      res.json(parts);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  // ✏ Update part
  const updatePart = async (req, res) => {
    try {

      const { id } = req.params;
      const { name, category, price } = req.body;

      const part = await Part.findById(id);

      if (!part) {
        return res.status(404).json({ message: "Part not found" });
      }

      part.name = name || part.name;
      part.category = category || part.category;
      part.price = price || part.price;

      // update image if new file uploaded
      if (req.file) {
        part.image = req.file.path;
      }

      await part.save();

      res.json({
        message: "Part updated successfully",
        part
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  // Adjust stock (Admin)
const setStock = async (req, res) => {

  try {

    const { id } = req.params;
    const { stock } = req.body;

    const part = await Part.findById(id);

    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }

    part.stock = Number(stock);
    part.lastStockUpdatedAt = new Date();

    await part.save();

    res.json({
      message: "Stock updated successfully",
      stock: part.stock
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

};

module.exports = {
  addPart,
  getParts,
  increaseStock,
  deletePart,
  getLowStockParts,
  updatePart,
  setStock
};