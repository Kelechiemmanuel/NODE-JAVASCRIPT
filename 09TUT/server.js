const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions")
const { logger } = require("./middleware/logEvent")
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 2004;

// custom middleware logger
app.use(logger);

// cross origin resource sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false }));

//built-in middleware for json
app.use(express.json());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));

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

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
    
})