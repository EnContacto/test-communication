const express = require("express");
const { deleteMessage } = require("../controllers/messageController");
const router = express.Router();

router.delete("/delete/:messageId", deleteMessage);

module.exports = router;
