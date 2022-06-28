const router = require("express").Router();

const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");
const outlineRoutes = require("./single-outline-routes");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/outline", outlineRoutes);
router.use("/api", apiRoutes);
router.get("*", (req, res) => {
  res.render("error", {
    message: "404 - Sadly, there's nothing at this address.",
    loggedIn: req.session.loggedIn
  })
});

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
