require('dotenv').config();
const { env } = require('process');
const jwt = require('jsonwebtoken');

module.exports = function authMidleware(req, res, next) {
    let cookie = req.headers.cookie?.match(/access_token=([^;]*)/);
    let token = cookie ? cookie[1] : null;
   
    // if (!token) {
    //     const match = req.headers.cookie?.match(/access_token=([^;]*)/);
    //     token = match ? match[1] : null;
    // }
    
    if (!token)
        return res.status(401).json({ message: "Access denied! no token provided!" });
    try {
        const decoded = jwt.verify(token, env.PRIVATEKEY || "IDon'tHaveSecrest");
        req.user = decoded;
        next();
    } catch (e) {
        console.log("invalid token!");
        return res.status(403).json({ messge: "Invalid token!"});
    }

}

