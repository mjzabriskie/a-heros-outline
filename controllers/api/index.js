const router = require("express").Router();

const userRoutes = require("./user-routes");
// const outlineRoutes = require("./outline-routes");

router.use("/users", userRoutes);
// router.use("/outlines", outlineRoutes);

module.exports = router;
