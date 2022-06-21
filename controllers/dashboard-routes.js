const router = require("express").Router();
const { Outline } = require("../models");
const withAuth = require("../utils/auth");

// Gets all of the user's outlines - will send the user to the login screen if they aren't logged in
router.get("/", withAuth, (req, res) => {
  // Returns all outlines in the database belonging to the user
  Outline.findAll({
    // Only returns the user's outlines based on the user_id saved in the session
    where: {
      user_id: req.session.user_id,
    },
    // Orders the outlines by when they were last updated
    order: [["updatedAt", "DESC"]],
  })
    .then((dbOutlineData) => {
      const outlines = dbOutlineData.map((outline) =>
        outline.get({ plain: true })
      );
      // Passes an object contatining the outlines and the loggedIn property to the dashboard handlebars
      res.render("dashboard", {
        outlines,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
