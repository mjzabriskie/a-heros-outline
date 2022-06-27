const router = require("express").Router();
const { User, Outline } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  res.render("outline", {
    loggedIn: req.session.loggedIn,
  });
});

// GET /outline/:id - gets a specific outline in the database to be viewed on a single outline page
router.get("/:id", withAuth, (req, res) => {
  // Returns a specific outline from the database
  Outline.findOne({
    // Specifies the primary key of the desired outline
    where: {
      id: req.params.id,
    },
    include: [
      // Includes the User info with the outline
      {
        model: User,
        // Does not return their passwords
        attributes: { exclude: ["password"] },
      },
    ],
  })
    .then((outlineData) => {
      // Checks if the outline at the specified ID exists - renders an error page if it doesn't exist
      if (!outlineData) {
        res.render("error", {
          message: "404 - No outline was found with that ID.",
          loggedIn: req.session.loggedIn
        });
        return;
      }

      const outline = outlineData.get({ plain: true });

      // Checks if the outline belongs to the current user
      return outline.user_id === req.session.user_id
        ? // Will display the outline/:id page using the outline handlebars if the outline belongs to the current user
          res.render("outline", {
            outline,
            loggedIn: req.session.loggedIn,
          })
        : // Otherwise checks if the user is logged in
        req.session.user_id
        ? // Redirects the user to their dashboard if they're logged in
          res.redirect("/dashboard")
        : // If the user is not logged in, they are redirected to the homepage
          res.redirect("/");
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
