const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  Shows: {
    type: String,
  },
  Company: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Timezone: {
    type: String,
  },
}, { timestamps: true });

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
