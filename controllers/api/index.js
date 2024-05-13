const router = require("express").Router();

const todoRoutes = require("./todoRoutes");
const userRoutes = require("./userRoutes");
const categoryRoutes = require("./catagoryRoutes");

router.use("/todos", todoRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
