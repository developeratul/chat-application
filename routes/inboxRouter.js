const express = require("express");

// middlewares
const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/checkLogin");

// controllers
const { getInbox } = require("../controllers/inboxController");

const router = express.Router();

router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
