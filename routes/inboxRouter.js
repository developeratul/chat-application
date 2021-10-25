const express = require("express");

// middlewares
const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/checkLogin");
const attachmentUpload = require("../middlewares/attachmentUpload");

// controllers
const {
  getInbox,
  createConversation,
  getMessages,
  getConversationsInJSONformat,
  sendMessage,
} = require("../controllers/inboxController");

const router = express.Router();

router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

router.get("/getConversationsInJSONformat", checkLogin, getConversationsInJSONformat);

router.post("/createConversation", checkLogin, createConversation);

router.get("/messages/:conversationId", checkLogin, getMessages);

router.post("/message", checkLogin, attachmentUpload, sendMessage);

module.exports = router;
