const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

// PUBLIC
router.get("/", reviewController.getAll);
router.get("/:id", reviewController.getById);

// ADMIN
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

router.post("/", auth, isAdmin, reviewController.create);
router.put("/:id", auth, isAdmin, reviewController.update);
router.delete("/:id", auth, isAdmin, reviewController.remove);

module.exports = router;