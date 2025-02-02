const messageService = require("../services/messageService");

exports.getMessages = async (req, res) => {
  const { receiverId } = req.params;
  
  try {
    const messages = await messageService.getMessages(receiverId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
