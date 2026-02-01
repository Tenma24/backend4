const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1950, max: 2100 },
    price: { type: Number, required: true, min: 0 },

    mileage: { type: Number, default: null },
    color: { type: String, default: "", trim: true },
    transmission: { type: String, default: "", trim: true },
    fuel: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
