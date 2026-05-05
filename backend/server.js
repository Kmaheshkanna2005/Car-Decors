const express = require("express");
const cors = require("cors");   // ✅ only once

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

// ✅ CORS setup
app.use(cors({
  origin: "*"
}));

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/parts", partRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);

// DB connect
connectDB().then(() => {
  createDefaultAdmin();
});

// test route
app.get("/", (req, res) => {
  res.send("Car Decors API is running");
});

// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});