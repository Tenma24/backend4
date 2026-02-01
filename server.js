require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = process.env.DB_NAME || "wt2_assignment4_autodealer";

mongoose
  .connect(MONGO_URI, { dbName: DB_NAME })
  .then(() => {
    console.log(`MongoDB connected: ${MONGO_URI} | DB: ${DB_NAME}`);
    app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connect error:", err.message);
    process.exit(1);
  });