const express = require("express");
const app = express();
const reloadMagic = require("./reload-magic.js");
const multer = require("multer");
const upload = multer({ dest: __dirname + "/uploads/" });
const fetch = require("node-fetch");

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

// endpoints

/**
 * endpoint for People
 * selected page passed to api call and return results for that page
 */
app.get("/getPeople", upload.none(), async (req, res) => {
  let _pageSelected = parseInt(req.query.page);

  try {
    let response = await fetch(
      `https://swapi.co/api/people/?page=${_pageSelected}`
    );
    let reponseBody = await response.text();
    res.send({ success: true, data: reponseBody });
  } catch (error) {
    res.send({ success: false, error: _error });
  }
});

/**
 * endpoint for Planets
 * selected page passed to api call and return results for that page
 */
app.get("/getPlanets", upload.none(), async (req, res) => {
  let _pageSelected = parseInt(req.query.page);

  try {
    let response = await fetch(
      `https://swapi.co/api/planets/?page=${_pageSelected}`
    );
    let reponseBody = await response.text();
    res.send({ success: true, data: reponseBody });
  } catch (error) {
    res.send({ success: false, error: _error });
  }
});

/**
 * endpoint for Starships
 * selected page passed to api call and return results for that page
 */
app.get("/getStarships", upload.none(), async (req, res) => {
  let _pageSelected = parseInt(req.query.page);

  try {
    let response = await fetch(
      `https://swapi.co/api/starships/?page=${_pageSelected}`
    );
    let reponseBody = await response.text();
    res.send({ success: true, data: reponseBody });
  } catch (error) {
    res.send({ success: false, error: _error });
  }
});

/**
 * endpoint for searching People
 * search input and selected page passed
 */
app.get("/peopleSearch", upload.none(), async (req, res) => {
  let _search = req.query.search;
  let _page = req.query.page;
  let apiCall = "";

  if (_page === undefined) {
    apiCall = `https://swapi.co/api/people/?search=${_search}`;
  } else {
    apiCall = `https://swapi.co/api/people/?page=${_page}&search=${_search}`;
  }
  try {
    let response = await fetch(apiCall);
    let reponseBody = await response.text();
    res.send({ success: true, data: reponseBody });
  } catch (_error) {
    res.send({ success: false, error: _error });
  }
});
// endpoints

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
