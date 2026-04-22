const Meme = require("../models/Meme");

async function getRandomMeme() {
  const count = await Meme.countDocuments();
  if (count === 0) return null;

  const random = Math.floor(Math.random() * count);
  return Meme.findOne().skip(random);
}

async function getMemesByTag(tag) {
  return Meme.find({ tags: tag });
}

module.exports = {
  getRandomMeme,
  getMemesByTag,
};