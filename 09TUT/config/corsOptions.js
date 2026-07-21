const whiteList = [
    "https://www.yousite.com", 
    "http://127.0.0.1:5500",
    "http://localhost:2002"];
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

module.exports = corsOptions;