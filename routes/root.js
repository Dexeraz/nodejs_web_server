const express = require("express");
const router = express.Router();
const path = require("path");

//Regex recap
//^ - begins with the '/'
//$ - end with the '/'
//'|' - or
//'()?' - optional

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, '..', "views", "index.html"));
});

router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, '..', "views", "new-page.html"));
});

router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //301 specified
});

module.exports = router;
