const express = require("express");
const router = express.Router();

const { getAgentsByFilters } = require("../controllers/agentsController");

router.get("/get-agent", getAgentsByFilters);

module.exports = router;
