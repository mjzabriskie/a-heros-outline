const router = require("express").Router();

const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");
const outlineRoutes = require("./single-outline-routes");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/outline", outlineRoutes);
router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
