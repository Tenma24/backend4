const express = require("express");
const router = express.Router();

const carController = require("../controllers/carController");

// PUBLIC
router.get("/", carController.getAll);
router.get("/:id", carController.getById);

// ADMIN
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

router.post("/", auth, isAdmin, carController.create);
router.put("/:id", auth, isAdmin, carController.update);
router.delete("/:id", auth, isAdmin, carController.remove);

module.exports = router;
