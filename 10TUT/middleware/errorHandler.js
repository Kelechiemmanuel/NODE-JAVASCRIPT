const { logEvents } = require("./logEvent");

const errorHandler = (error, req, res, next) => {
    logEvents(`${error.name}: ${error.message}`, "errLog.txt")
    console.error(error.stack);
    res.status(500).send(error.message);
    
}

module.exports = errorHandler;