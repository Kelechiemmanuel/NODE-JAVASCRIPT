const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvent")
const errorHandler = require("./middleware/errorHandler")
const PORT = process.env.PORT || 2002;

app.use(express.urlencoded({extended: false }));

//built-in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

// custom middleware logger
app.use(logger);

// cross origin resource sharing
const whiteList = ["https://www.yousite.com", "http://127.0.0.1:5500", "http://localhost:2002"];
const corsOptions = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    // res.sendFile("./views/index.html", { root: __dirname}) or
    res.sendFile(path.join(__dirname, "views", "index.html"))
})
app.get("/new-page", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"))
})

app.get("/old-page", (req, res) => {
    res.redirect(302, "/new-page");
})

app.all("/{*splat}", (req, res) => {
    res.status(404);
    if(req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"))
    } else if(req.accepts("json")) {
        res.json({error: "404 Not found"});
    } else {
        res.type("txt").send("404 Not found");
    }
})

app.get("/hello", (req, res, next) => {
    console.log(("Attempted t load hello.html"));
    next();
}, (req, res) => {
    res.send("Hello World!")
})

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
    
})