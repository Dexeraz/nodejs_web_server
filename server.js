const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger, logEvents } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//Cross Origin Resource Sharing
//Open to the public API
//app.use(cors());

//give acces the API for a specific domain
const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded form data
//form data: 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//middleware for json data being submited
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

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

// Chaining route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};

app.get("/chain(.html)?", [one, two, three]);

// Route handlers
//Different 404 depending on the file type request
app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html")); //withour status(404) we would get 200 status code
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
