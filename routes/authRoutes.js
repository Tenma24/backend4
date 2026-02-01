const router = require("express").Router();
const { register, login, makeAdmin } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/make-admin", makeAdmin);

module.exports = router;
