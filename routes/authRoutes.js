const express = require("express");
const {
  registerUser,
  loginUser,
  profile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/me", protect, profile);

module.exports = router;
