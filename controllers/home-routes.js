const router = require("express").Router();
const { Outline, User } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
