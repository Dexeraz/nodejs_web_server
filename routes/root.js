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

module.exports = router;
