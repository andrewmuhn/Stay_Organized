const router = require("express").Router();
const fs = require("fs");

// Get all categories
router.get("/", function (request, response) {
    console.info("LOG: Got a GET request for all categories");

    const json = fs.readFileSync(
        __dirname + "/../../data/categories.json",
        "utf8"
    );
    const categories = JSON.parse(json);

    // LOG data for tracing
    console.info("LOG: Returned categories are ->", categories);

    response.status(200).json(categories);
});

module.exports = router;
