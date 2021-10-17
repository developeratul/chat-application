const People = require("../models/people");
const { unlink } = require("fs");
const path = require("path");

module.exports = {
  getUsers: async function (req, res, next) {
    try {
      const users = await People.find({});
      res.render("users", { users });
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async function (req, res, next) {
    try {
      const { id: userId } = req.params;
      const user = await People.findByIdAndDelete({ _id: userId });

      if (user?.avatar) {
        unlink(path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

      res.status(201).json({ message: "User was deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};
