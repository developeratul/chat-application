const express = require("express");

const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse");

const { getUsers, deleteUser } = require("../controllers/usersController");

const router = express.Router();

router.get("/", decorateHtmlResponse("Users"), getUsers);

router.delete("/:id", deleteUser);

module.exports = router;
