const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeaders = req.headers.authorization || req.headers.authorization;
    if(!authHeaders?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeaders.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (error, decoded) => {
            if(error) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
}

module.exports = verifyJWT;