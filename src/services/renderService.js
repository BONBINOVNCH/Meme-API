function buildMemeResponse(trigger) {
  return {
    matched: true,
    trigger: trigger.word,
    response: trigger.response,
    category: trigger.category,
  };
}

module.exports = {
  buildMemeResponse,
};