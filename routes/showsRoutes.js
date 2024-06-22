const express = require("express");
const router = express.Router();
const {
  createShow,
  filterShowsByTimezone,
} = require("../controllers/showsController");

// Route to create a new show
router.post("/create-show", createShow);

// Route to get show with timezone
router.get("/filter-shows", filterShowsByTimezone);

module.exports = router;
