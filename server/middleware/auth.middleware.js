const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            error: "You must be logged in"
        })
    }
    const data = jwt.verify(token, "todolist@123");
    User.findById(data._id).then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    })
}

module.exports = authMiddleware