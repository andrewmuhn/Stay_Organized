const withAuth = require("../utils/auth");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.render("home");
});

router.get("/todos", withAuth, async (req, res) => {
    res.render("todos");
});

router.get("/new_todo", withAuth, async (req, res) => {
    res.render("new_todo");
});

router.get("/complete_todo", async (req, res) => {
    res.render("complete_todo");
});

module.exports = router;
