const express = require("express");
const {
  registerUser,
  loginUser,
  getUserByEmail,
} = require("../controllers/userController");
const { validate, userRegistrationRules } = require("../middleware/user");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new user
router.post(
  "/register",
  userRegistrationRules(),
  validate(userRegistrationRules()),
  registerUser
);

// Login a user
router.post("/login", loginUser);

// search for user with email
router.post("/get-user", protect, getUserByEmail);

module.exports = router;
