const jwt = require("jsonwebtoken");
const people = require("../models/people");

async function checkLogin(req, res, next) {
  const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    try {
      const token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await people.findOne({ _id: decoded.id });

      if (!user) {
        if (res.locals.html) {
          res.render("index");
        } else {
          res.status(401).json({ msg: "Unauthorized!" });
        }
      } else {
        req.user = user;
        res.locals.loggedInUser = user;
        next();
      }
    } catch (err) {
      res.status(500).json({ errors: { common: { msg: err.message } } });
    }
  } else {
    if (res.locals.html) {
      res.redirect("/");
    } else {
      res.status(401).json({ msg: "Unauthorized!" });
    }
  }
}

const redirectLoggedIn = async function (req, res, next) {
  let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    const token = cookies[process.env.COOKIE_NAME];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await people.findOne({ _id: decoded.id });

    if (!user) {
      next();
    } else {
      res.redirect("/inbox");
    }
  } else {
    next();
  }
};

module.exports = { checkLogin, redirectLoggedIn };
