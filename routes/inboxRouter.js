const express = require("express");

// middlewares
const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/checkLogin");

// controllers
const {
  getInbox,
  createConversation,
  getMessages,
  getConversationsInJSONformat,
} = require("../controllers/inboxController");

const router = express.Router();

router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

router.get("/getConversationsInJSONformat", checkLogin, getConversationsInJSONformat);

router.post("/createConversation", checkLogin, createConversation);

router.get("/messages/:conversationId", checkLogin, getMessages);

module.exports = router;
