const express = require("express");
const router = express.Router();
const Meme = require("../models/Meme");

/**
 * @swagger
 * tags:
 *   name: Memes
 *   description: Meme CRUD operations
 */

/**
 * @swagger
 * /api/memes:
 *   get:
 *     summary: Get all memes
 *     tags: [Memes]
 *     responses:
 *       200:
 *         description: List of memes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", async (req, res) => {
  try {
    const memes = await Meme.find();
    res.json(memes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @swagger
 * /api/memes/random:
 *   get:
 *     summary: Get a random meme
 *     tags: [Memes]
 *     responses:
 *       200:
 *         description: Random meme object
 *       404:
 *         description: No memes found
 */
router.get("/random", async (req, res) => {
  try {
    const count = await Meme.countDocuments();
    if (count === 0) return res.status(404).json({ message: "No memes found" });

    const random = Math.floor(Math.random() * count);
    const meme = await Meme.findOne().skip(random);
    res.json(meme);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @swagger
 * /api/memes:
 *   post:
 *     summary: Create a new meme
 *     tags: [Memes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - response
 *             properties:
 *               title:
 *                 type: string
 *                 example: "This is fine"
 *               category:
 *                 type: string
 *                 example: "debugging"
 *               response:
 *                 type: string
 *                 example: "Коли код горить, але ти ще робиш вигляд, що все під контролем."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["backend", "debugging"]
 *     responses:
 *       201:
 *         description: Meme created successfully
 */
router.post("/", async (req, res) => {
  try {
    const meme = await Meme.create(req.body);
    res.status(201).json(meme);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;