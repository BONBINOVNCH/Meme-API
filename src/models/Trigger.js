const mongoose = require("mongoose");

const triggerSchema = new mongoose.Schema(
  {
    word: { type: String, required: true, unique: true, trim: true },
    forms: [{ type: String, trim: true }],
    response: { type: String, required: true },
    category: { type: String, default: "general" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trigger", triggerSchema);