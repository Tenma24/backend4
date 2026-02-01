const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const errorLogger = require("./middleware/errorLogger");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api", (req, res) => {
  res.json({ message: "Auto Dealership API (Assignment 4) is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/reviews", reviewRoutes);

// API 404
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// error middleware last
app.use(errorLogger);

module.exports = app;
