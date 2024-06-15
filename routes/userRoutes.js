const express = require("express");
const {
  registerUser,
  loginUser,
  getUserByEmail,
} = require("../controllers/userController");
const { validate, userRegistrationRules } = require("../middleware/user");

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
router.get("/get-user", getUserByEmail);

module.exports = router;
