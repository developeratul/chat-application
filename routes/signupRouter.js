const express = require("express");

const router = express.Router();

const { getSignup, createUser } = require("../controllers/signupController");

const avatarUpload = require("../middlewares/avatarUpload");
const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse");
const { userValidations, userValidationHandler } = require("../middlewares/userValidation");

// signup page
router.get("/", decorateHtmlResponse("Signup"), getSignup);

// for creating a new user
router.post("/", avatarUpload, userValidations, userValidationHandler, createUser);

module.exports = router;
