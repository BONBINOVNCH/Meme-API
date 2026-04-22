const express = require("express");
const router = express.Router();
const Template = require("../models/Template");

/**
 * @swagger
 * tags:
 *   name: Templates
 *   description: Manage meme templates
 */

/**
 * @swagger
 * /api/templates:
 *   get:
 *     summary: Get all templates
 *     tags: [Templates]
 *     responses:
 *       200:
 *         description: List of templates
 */
router.get("/", async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @swagger
 * /api/templates:
 *   post:
 *     summary: Create a new template
 *     tags: [Templates]
 *     description: Adds a meme template, including base64 image data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - imageBase64
 *             properties:
 *               name:
 *                 type: string
 *                 example: "drake"
 *               imageBase64:
 *                 type: string
 *                 example: "data:image/png;base64,iVBORw0KGgoAAA..."
 *               mimeType:
 *                 type: string
 *                 example: "image/png"
 *               width:
 *                 type: number
 *                 example: 1024
 *               height:
 *                 type: number
 *                 example: 1024
 *     responses:
 *       201:
 *         description: Template created successfully
 */
router.post("/", async (req, res) => {
  try {
    const template = await Template.create(req.body);
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;