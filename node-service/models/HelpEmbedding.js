const mongoose = require("mongoose");

const HelpEmbeddingSchema = new mongoose.Schema(
  {
    question: String,
    answer: String
  },
  {
    collection: "help_embeddings"
  }
);

module.exports = mongoose.model(
  "HelpEmbedding",
  HelpEmbeddingSchema
);