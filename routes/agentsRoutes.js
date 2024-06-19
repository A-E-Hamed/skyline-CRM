const express = require("express");
const router = express.Router();
const { getAgentsByFilters } = require("../controllers/agentsController");
const { protect } = require("../middleware/authMiddleware");

router.get("/get-agent", protect, getAgentsByFilters);

module.exports = router;
