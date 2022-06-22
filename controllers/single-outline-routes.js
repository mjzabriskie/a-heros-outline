const router = require("express").Router();
const { User, Outline } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
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
        res.status(404).json({ message: "No outline found with that ID. " });
        return;
      }

      const outline = outlineData.get({ plain: true });

      // Will display the outline/:id page using the outline handlebars - currentUser is used to provide options specific to the current user, allowing them to modify their outlines and comments
      res.render("outline", {
        outline,
        loggedIn: req.session.loggedIn,
      });
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
