const express = require("express");

const router = express.Router();

const { getSignup } = require("../controllers/signupController");

const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse");

router.get("/", decorateHtmlResponse("Signup"), getSignup);

module.exports = router;
