const mongoose = require("mongoose");

const RegistrationSessionSchema = new mongoose.Schema(
  {
    sessionId: String,
    currentStep: Number,
    data: Object,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "registration_sessions"
  }
);

module.exports = mongoose.model(
  "RegistrationSession",
  RegistrationSessionSchema
);