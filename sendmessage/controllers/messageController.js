const Message = require("../models/messageModel");
const messageService = require("../services/messageService");

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, messageText } = req.body;
  const timestamp = new Date().toISOString();
  const message = new Message(senderId, receiverId, messageText, timestamp);
  
  try {
    const response = await messageService.sendMessage(message);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};