const express = require("express");
const { getMessages } = require("../controllers/messageController");
const router = express.Router();

router.get("/get/:receiverId", getMessages);

module.exports = router;