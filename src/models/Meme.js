const mongoose = require("mongoose");

const memeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "general" },
    response: { type: String, required: true },
    tags: [{ type: String, trim: true }],
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meme", memeSchema);