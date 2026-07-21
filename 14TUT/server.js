require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions")
const { logger } = require("./middleware/logEvent")
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbCon");
const PORT = process.env.PORT || 2009;


//Connect to mongo DB
connectDB();

// custom middleware logger
app.use(logger);

//Handle options credentials checks before CORS
app.use(credentials);

// cross origin resource sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false }));

//built-in middleware for json
app.use(express.json());

//middleware for cookie
app.use(cookieParser())

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

//Route
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
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

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});
    
});