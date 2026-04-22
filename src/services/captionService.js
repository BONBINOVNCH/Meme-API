function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function findTrigger(text, triggers) {
  const words = normalizeText(text);

  return triggers.find((trigger) =>
    words.some(
      (word) =>
        word === trigger.word ||
        trigger.forms?.includes(word) ||
        word.includes(trigger.word) ||
        trigger.word.includes(word)
    )
  );
}

module.exports = {
  normalizeText,
  findTrigger,
}; 