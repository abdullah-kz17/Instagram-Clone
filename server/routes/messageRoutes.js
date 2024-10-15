const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/all/:id", authMiddleware, messageController.getMessages);
router.post("/send/:id", authMiddleware, messageController.sendMessage);

module.exports = router;
