const { log } = require("handlebars");
const withAuth = require("../utils/auth");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.render("home", {
        logged_in: req.session.logged_in,
    });
});

router.get("/todos", withAuth, async (req, res) => {
    res.render("todos", {
        userId: req.session.user_id,
        logged_in: req.session.logged_in,
    });
});

router.get("/new_todo", withAuth, async (req, res) => {
    res.render("new_todo", {
        userId: req.session.user_id,
        logged_in: req.session.logged_in,
    });
});

module.exports = router;
