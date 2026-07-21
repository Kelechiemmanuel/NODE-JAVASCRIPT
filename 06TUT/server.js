const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 2001;

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

app.get("/{*splat}", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})

app.get("/hello", (req, res, next) => {
    console.log(("Attempted t load hello.html"));
    next();
}, (req, res) => {
    res.send("Hello World!")
})
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
    
})