const express = require("express");
const router = express.Router();
const Trigger = require("../models/Trigger");

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * @swagger
 * tags:
 *   name: Triggers
 *   description: Manage trigger words and meme responses
 */

/**
 * @swagger
 * /api/triggers:
 *   get:
 *     summary: Get all triggers
 *     tags: [Triggers]
 *     responses:
 *       200:
 *         description: List of all trigger words
 */
router.get("/", async (req, res) => {
  try {
    const triggers = await Trigger.find();
    res.json(triggers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @swagger
 * /api/triggers:
 *   post:
 *     summary: Create a new trigger
 *     tags: [Triggers]
 *     responses:
 *       201:
 *         description: Trigger created successfully
 */
router.post("/", async (req, res) => {
  try {
    const trigger = await Trigger.create(req.body);
    res.status(201).json(trigger);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @swagger
 * /api/triggers/analyze:
 *   post:
 *     summary: Analyze text and find a matching trigger
 *     tags: [Triggers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: "хто йде на пари"
 *     responses:
 *       200:
 *         description: Trigger found or fallback response
 *       400:
 *         description: Text is required
 */
router.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const words = normalizeText(text);
    const triggers = await Trigger.find();

    const match = triggers.find((trigger) =>
      words.some(
        (word) =>
          word === trigger.word ||
          trigger.forms?.includes(word) ||
          word.includes(trigger.word) ||
          trigger.word.includes(word)
      )
    );

    if (!match) {
      return res.json({
        matched: false,
        response: "Нічого не знайшов, але це все одно звучить мемно.",
      });
    }

    return res.json({
      matched: true,
      trigger: match.word,
      response: match.response,
      category: match.category,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;