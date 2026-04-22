const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    imageBase64: { type: String, required: true },
    mimeType: { type: String, default: "image/png" },
    width: { type: Number, default: 1024 },
    height: { type: Number, default: 1024 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", templateSchema);