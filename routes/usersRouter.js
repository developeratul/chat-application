const express = require("express");

// middlewares
const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/checkLogin");

const { getUsers, deleteUser } = require("../controllers/usersController");

const router = express.Router();

router.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);

router.delete("/:id", checkLogin, deleteUser);

module.exports = router;
