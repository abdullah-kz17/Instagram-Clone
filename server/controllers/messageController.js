const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");

const sendMessage = async () => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const message = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all(conversation.save(), newMessage.save());

    // implement real time commmunication using socket.io

    // success message
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMessages = async () => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const conversation = await Conversation.find({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      return res.status(200).json({ success: true, messages: {} });
    }
    return res
      .status(200)
      .json({ success: true, messages: conversation.messages });
  } catch (error) {}
};

module.exports = {
  sendMessage,
  getMessages,
};
