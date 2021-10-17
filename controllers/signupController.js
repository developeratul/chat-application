const People = require("../models/people");

module.exports = {
  getSignup: function (req, res) {
    res.render("signup");
  },

  createUser: async function (req, res, next) {
    try {
      let newUser;
      if (req.files && req.files.length > 0) {
        newUser = new People({ ...req.body, avatar: req.files[0].filename });
      } else {
        newUser = new People({ ...req.body });
      }
      await newUser.save();
      res.status(201).json({ message: "Your account has been created" });
    } catch (err) {
      next(err);
    }
  },
};
