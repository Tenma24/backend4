const Review = require("../models/Review");
const Car = require("../models/Car");

// GET /api/reviews (public)
exports.getAll = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).populate('carId');
    res.json({ count: reviews.length, reviews });
  } catch (e) {
    next(e);
  }
};

// GET /api/reviews/:id (public)
exports.getById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('carId');
    if (!review) return res.status(404).json({ error: "Not Found" });
    res.json(review);
  } catch {
    res.status(400).json({ error: "Invalid id" });
  }
};

// POST /api/reviews (admin)
exports.create = async (req, res) => {
  try {
    const { carId, rating, comment } = req.body;

    // Validate required fields
    if (!carId) {
      return res.status(400).json({ error: "Bad Request", details: ["carId is required"] });
    }
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Bad Request", details: ["rating must be between 1 and 5"] });
    }
    if (!comment || comment.trim().length < 2) {
      return res.status(400).json({ error: "Bad Request", details: ["comment is required (min 2 chars)"] });
    }

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(400).json({ error: "Bad Request", details: ["Car with this carId not found"] });
    }

    const review = await Review.create({ carId, rating, comment });
    const populated = await Review.findById(review._id).populate('carId');
    res.status(201).json(populated);
  } catch (e) {
    res.status(400).json({ error: "Bad Request", details: [e.message] });
  }
};

// PUT /api/reviews/:id (admin)
exports.update = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // Validate fields
    const errors = [];
    if (rating !== undefined && (rating < 1 || rating > 5)) {
      errors.push("rating must be between 1 and 5");
    }
    if (comment !== undefined && comment.trim().length < 2) {
      errors.push("comment must be at least 2 chars");
    }
    if (errors.length > 0) {
      return res.status(400).json({ error: "Bad Request", details: errors });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id, 
      { rating, comment }, 
      { new: true, runValidators: true }
    ).populate('carId');

    if (!review) return res.status(404).json({ error: "Not Found" });
    res.json(review);
  } catch (e) {
    res.status(400).json({ error: "Bad Request", details: [e.message] });
  }
};

// DELETE /api/reviews/:id (admin)
exports.remove = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: "Not Found" });
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(400).json({ error: "Invalid id" });
  }
};