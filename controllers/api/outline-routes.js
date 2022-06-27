const router = require("express").Router();
const { Outline } = require("../../models");

// GET /api/outlines - gets all outlines in the database
router.get("/", (req, res) => {
  // Returns all outlines in the database
  Outline.findAll({})
    // Returns the outline info for all outlines
    .then((outlineData) => res.json(outlineData))
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// GET /api/outlines/:id - gets a specific outline in the database
router.get("/:id", (req, res) => {
  // Returns a specific outline from the database
  Outline.findOne({
    // Specifies the primary key of the desired outline
    where: {
      id: req.params.id,
    },
  })
    .then((outlineData) => {
      // Checks if the outline at the specified ID exists - sends an error if they don't
      if (!outlineData) {
        res.status(404).json({ message: "No outline found with this id" });
        return;
      }
      // Returns the outline info
      res.json(outlineData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// POST /api/outlines - adds a new outline to the database
router.post("/", (req, res) => {
  // req.body is used because the body of the JSON object being passed through the route should have all the pertinent information to create a new outline (outlinename and password)
  Outline.create({
    title: req.body.title,
    comfort_zone: req.body.comfort_zone,
    character_desire: req.body.character_desire,
    new_situation: req.body.new_situation,
    character_adapts: req.body.character_adapts,
    gets_desire: req.body.gets_desire,
    heavy_price: req.body.heavy_price,
    familiar_situation: req.body.familiar_situation,
    character_changed: req.body.character_changed,
    user_id: req.session.user_id,
  })
    .then((outlineData) => res.json(outlineData))
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// PUT /api/outlines/:id - updates a specific outline in the database
router.put("/:id", (req, res) => {
  // req.body is used because the body of the JSON object being passed through the route should have any pertinent information to update the outline (outlinename, password, or both)
  Outline.update(req.body, {
    // Indicates which outline to update
    where: {
      id: req.params.id,
    },
  })
    .then((outlineData) => {
      // Checks if the outline at the specified ID exists - sends an error if they don't
      if (!outlineData[0]) {
        res.status(404).json({ message: "No outline found with this id" });
        return;
      }
      // Will return the updated outline info
      res.json(outlineData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// DELETE /api/outlines/:id - deletes a specific outline in the database
router.delete("/:id", (req, res) => {
  Outline.destroy({
    // Indicates which outline to update
    where: {
      id: req.params.id,
    },
  })
    .then((outlineData) => {
      // Checks if the outline at the specified ID exists - sends an error if they don't
      if (!outlineData) {
        res.status(404).json({ message: "No outline found with this id" });
        return;
      }
      // Will return the number of changed rows
      res.json(outlineData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
