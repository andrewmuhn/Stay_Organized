const express = require("express");
const path = require("path");
const cors = require("cors");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const fs = require("fs");
const { helpers } = require("handlebars");
const routes = require("./controllers");

const app = express();

///////////////////////////////////////////////////////////////////////
//   MIDDLEWARE (CONFIGURATIONS) //////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// Set up Handlebars as the view engin

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Permit cross-origin requests
app.use(cors());

// Support application/x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));

// Support application/json data
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Serve static front-end files (HTML, etc.) from "./public"
// app.use(express.static("public"));

///////////////////////////////////////////////////////////////////////
//   API ENDPOINTS ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
// Start the server ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const server = app.listen(8083, () => {
    const port = server.address().port;
    console.info(`App listening at http://localhost:${port}`);
});
