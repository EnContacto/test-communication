const messageService = require("../services/messageService");

exports.deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  
  try {
    const response = await messageService.deleteMessage(messageId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
