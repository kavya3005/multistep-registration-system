const mongoose = require("mongoose");

const StepLogSchema = new mongoose.Schema(
  {
    sessionId: String,
    step: Number,
    action: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "step_logs"
  }
);

module.exports = mongoose.model(
  "StepLog",
  StepLogSchema
);