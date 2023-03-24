const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

//Regex recap
//^ - begins with the '/'
//$ - end with the '/'
//'|' - or
//'()?' - optional

app.get("^/$|/index(.html)?", (req, res) => {
  //res.sendFile('./views/index.html', {root: __dirname});    //direct
  res.sendFile(path.join(__dirname, "views", "index.html")); //second option
});

app.get("/new-page(.html)?", (req, res) => {
  //res.sendFile('./views/index.html', {root: __dirname});    //direct
  res.sendFile(path.join(__dirname, "views", "new-page.html")); //second option
});

app.get("/old-page(.html)?", (req, res) => {
  // res.redirect('/new-page.html'); //302 by default
  res.redirect(301, "/new-page.html"); //301 specified
});

// Route handlers
app.get("/hello(.html)?", (req, res, next) => {
    console.log('attempted to load hello.html')
    next()
}, (req, res) => {
    res.send('Hello World!');
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html")); //withour status(404) we would get 200 status code
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
