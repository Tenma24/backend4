const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
  const dbName = process.env.DB_NAME || "wt2_assignment4_autodealer";

  await mongoose.connect(uri, { dbName });
  console.log(`MongoDB connected: ${uri} | DB: ${dbName}`);
}

module.exports = connectDB;
