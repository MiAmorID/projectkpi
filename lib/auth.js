const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

let lib = {
    getToken: async (data) => {
        try {
            let absolute_path = path.resolve("./private.key");
            let privateKey = fs.readFileSync(absolute_path, "utf8");
            let token = new Promise((resolve, reject) => {
                jwt.sign(data, privateKey, { algorithm: 'RS256'}, (err, token) => {
                    if(err) reject(err);
                    else resolve(token);
                });
            })
            return token;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    },
    verifyToken: async (data) => {
        try {
            let absolute_path = path.resolve("./public.key");
            let privateKey = fs.readFileSync(absolute_path, "utf8");
            let token = new Promise((resolve, reject) => {
                jwt.verify(data, privateKey, { algorithm: 'RS256'}, (err, decoded) => {
                    if(err) reject(err);
                    else resolve(decoded);
                });
            })
            return token;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    },
    check: async(req, res, next) => {
        try {
            let token = req.get("AUTH-TOKEN");
            user = await lib.verifyToken(token)
            if(user) delete(user.password)
            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message : "Session end, please login again" })
        }
    }
}

module.exports = lib