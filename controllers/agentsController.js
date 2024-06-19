const Agent = require("../models/agent");

const getAgentsByFilters = async (req, res) => {
  const filters = req.body;

  try {
    const query = {};

    // Iterate over keys in filters object and construct the query dynamically
    Object.keys(filters).forEach((key) => {
      query[key] = filters[key];
    });

    const agents = await Agent.find(query);

    if (agents.length > 0) {
      res.json(agents);
    } else {
      res
        .status(404)
        .json({ message: "No agents found with the specified filters" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAgentsByFilters,
};
