const router = require("express").Router();
const fs = require("fs");

// Get all users (without passwords)
router.get("/", function (request, response) {
    console.info("LOG: Got a GET request for all users");

    const json = fs.readFileSync(__dirname + "/../../data/users.json", "utf8");
    const users = JSON.parse(json);

    // Copy users to an new array -- omitting the passwords
    const usersWithoutPasswords = [];
    for (const user of users) {
        usersWithoutPasswords.push({
            id: user.id,
            name: user.name,
            username: user.username,
        });
    }

    // LOG data for tracing
    console.info(
        "LOG: Returned users (without passwords) are ->",
        usersWithoutPasswords
    );

    response.status(200).json(usersWithoutPasswords);
});

// Find out if a specific username is available
router.get("/username_available/:username", function (request, response) {
    const requestedUsername = request.params.username;
    console.info(
        `LOG: Checking to see if username ${requestedUsername} is available`
    );

    const json = fs.readFileSync(__dirname + "/../../data/users.json", "utf8");
    const users = JSON.parse(json);

    // See if username already exists
    const matchingByUsername = (user) =>
        user.username.toLowerCase() === requestedUsername.toLowerCase();
    const availability = { available: !users.some(matchingByUsername) };

    // LOG response for tracing
    console.info("LOG: Returned message ->", availability);

    response.status(200).json(availability);
});

// GET a specific user
// NOTE: this endpoint returns the user without the password
router.get("/:username", function (request, response) {
    const username = request.params.username;
    console.info("LOG: Got a GET request for user with username " + username);

    const json = fs.readFileSync(__dirname + "/../../data/users.json", "utf8");
    const user = JSON.parse(json);

    // Find the user
    const byUsername = (user) =>
        user.username.toLowerCase() === username.toLowerCase();
    const matchingUser = user.find(byUsername);

    // If no matching user
    if (!matchingUser) {
        console.warn(`LOG: **NOT FOUND**: user ${username} does not exist!`);

        response.status(404).end();

        return;
    }

    // Create a copy without the password
    const userWithoutPassword = {
        id: matchingUser.id,
        name: matchingUser.name,
        username: matchingUser.username,
    };

    // LOG data for tracing
    console.info("LOG: Returned user is ->", userWithoutPassword);

    response.status(200).json(userWithoutPassword);
});

// POST a new user
router.post("/", function (request, response) {
    console.info("LOG: Got a POST request to add a user");
    console.info("LOG: Message body -------->", JSON.stringify(request.body));

    // If not all user data passed, reject the request
    if (
        !request.body.name ||
        !request.body.username ||
        !request.body.password
    ) {
        console.warn(
            "LOG: **MISSING DATA**: one or more user properties missing"
        );
        response.status(400).json({
            error: "Missing data, can't process: one or more User properties missing.",
        });

        return;
    }

    const json = fs.readFileSync(__dirname + "/../../data/users.json", "utf8");
    const users = JSON.parse(json);

    // Check for duplicate username
    const byUsername = (user) =>
        user.username.toLowerCase() === request.body.username.toLowerCase();
    const matchingUser = users.find(byUsername);

    // If username already exists, return 403
    if (matchingUser !== undefined) {
        console.warn("LOG: **ERROR: username already exists!");
        response
            .status(403)
            .json({ error: "Forbidden: Username already exists!" });

        return;
    }

    const user = {
        id: users.length + 1,
        name: request.body.name,
        username: request.body.username,
        password: request.body.password,
    };

    users.push(user);
    fs.writeFileSync(
        __dirname + "/../../data/users.json",
        JSON.stringify(users)
    );

    request.session.save(() => {
        request.session.user_id = user.id;
        request.session.logged_in = true;
        console.info("LOG: New user added is ->", user);
        response.status(201).json(user);
    });
});

router.post("/login", function (request, response) {
    console.info("LOG: Got a POST request to login a user");
    console.info("LOG: Message body -------->", JSON.stringify(request.body));

    // If not all user data passed, reject the request
    if (!request.body.username || !request.body.password) {
        console.warn(
            "LOG: **MISSING DATA**: one or more user properties missing"
        );
        response.status(400).json({
            error: "Missing data, can't process: one or more User properties missing.",
        });
        return;
    }

    const json = fs.readFileSync(__dirname + "/../../data/users.json", "utf8");
    const users = JSON.parse(json);

    // Check for duplicate username
    const byUsername = (user) =>
        user.username.toLowerCase() === request.body.username.toLowerCase();
    const matchingUser = users.find(byUsername);

    if (matchingUser === undefined) {
        console.warn("LOG: **ERROR: username/password is incorrect!");
        response
            .status(403)
            .json({ error: "Forbidden: Username or password is incorrect!" });
        return;
    }

    if (matchingUser.password !== request.body.password) {
        console.warn("LOG: **ERROR: username/password is incorrect!");
        response
            .status(403)
            .json({ error: "Forbidden: Username or password is incorrect!" });
        return;
    }

    request.session.save(() => {
        request.session.user_id = matchingUser.id;
        request.session.logged_in = true;
        console.info("LOG: User logged in ->", matchingUser);
        response.status(200).json(matchingUser);
    });
});

router.post("/logout", function (request, response) {
    console.info("LOG: Got a POST request to logout a user");

    if (request.session.logged_in) {
        request.session.destroy(() => {
            console.info("LOG: User logged out");
            response.status(204).end();
        });
    } else {
        console.warn("LOG: **ERROR: User not logged in!");
        response.status(403).json({ error: "Forbidden: User not logged in!" });
    }
});

module.exports = router;
