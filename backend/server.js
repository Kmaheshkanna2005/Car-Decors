const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const createDefaultAdmin = require("./utils/createAdmin");
const authRoutes = require("./routes/authRoutes");
const partRoutes = require("./routes/partRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reportRoutes = require("./routes/reportRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/parts", partRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);
connectDB().then(() => {
  createDefaultAdmin();
});

app.get("/", (req, res) => {
  res.send("Car Decors API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
