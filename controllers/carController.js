const Car = require("../models/Car");

// GET /api/cars (public)
exports.getAll = async (req, res, next) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json({ count: cars.length, cars });
  } catch (e) {
    next(e);
  }
};

// GET /api/cars/:id (public)
exports.getById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "Not Found" });
    res.json(car);
  } catch {
    res.status(400).json({ error: "Invalid id" });
  }
};

// POST /api/cars (admin)
exports.create = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (e) {
    res.status(400).json({ error: "Bad Request", details: [e.message] });
  }
};

// PUT /api/cars/:id (admin)
exports.update = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) return res.status(404).json({ error: "Not Found" });
    res.json(car);
  } catch (e) {
    res.status(400).json({ error: "Bad Request", details: [e.message] });
  }
};

// DELETE /api/cars/:id (admin)
exports.remove = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ error: "Not Found" });
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(400).json({ error: "Invalid id" });
  }
};
