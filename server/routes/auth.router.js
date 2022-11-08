const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/auth.middleware");


router.post("/signup", (req, res) => {
    const { username, email, password } = req.body

    User.findOne({ email: email }).then((user) => {
        if (user) {
            return res.status(400).json({
                error: "User already exists with that email"
            })
        }

        User.findOne({ username: username }).then((user) => {
            if (user) {
                return res.status(400).json({
                    error: "User already exists with that username"
                })
            }

            bcrypt.hash(password, 12).then(hash => {
                const user = new User({
					username,
					email,
					password: hash,
					todos: [],
					image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAP1BMVEXw8PDNXnPy9/bp1tnLUmrMW3DTfo3n0dXVhZPTfIvy9fXq293KTmfSdofMV27YlaHv6+vJRWDivMLam6Xjwcbq3/L7AAAB10lEQVR4nO3dXUrDUBCA0dikadMk/dP9r1VfBSEjzA3Tcr4FjHMqMi9y23WSJEmSJOlNu/eR5hfeqn8M2y3roTGp4Vb98LHdcdxbmLgVIWGbCAlbzcqLkLDVrLwICVvNyouQsNWsvAgJW83Ki5Cw1ay8CAlbzcqLkLDVrLwICVvNyouQsNWsvAj/JVyO212n0KxDpMveW83ruN10i+w1j+dAn6FReVtV/eDztsqs5p90ZoSE9SMkrB8hYf0ICetHSFg/QsL6ERLWj5CwfoSE9SMkrB8hYfkuLy2cI484fF0jwjU0674z8DAugVccIsAfYmDS8DjtLTwfQ9unNRBmd3l74fv/DgkJCQnb51oQEhISEhK6h4SEhISEkVwLQkJCQkJC95CQkJCQMJJrQUhISEhI6B4SEhISEkZyLQgJCQkJCd1DQkJCQsJIrgUh4R/CvO89uEfecJinnd9UWJ6htULC/hH5gWt/2u4ZexcjNCryiS7rzt8zk/i2SeozKYmzao4quhYhYf21CAnrr0VIWH8tQsL6axES1l+LkLD+WoSE9dciJKy/FiFh/bUICeuvRUj4a9Zy3O46hdYqOaqb13G76Rb554+ao7ruEOmVR0mSJEmS9IZ9A9yjbZJxGgdEAAAAAElFTkSuQmCC",
				});


                user.save().then(user => {
                    const token = jwt.sign({ _id: user._id }, "todolist@123", { expiresIn: 100000 });
                    return res.json({
                        message: "User created successfully",
                        token
                    })
                }).catch(err => {
                    console.log(err)
                })
            })
        })
    })
})

router.post("/login", (req, res) => {
    const {email, password} = req.body

    User.findOne({email: email}).then(user => {
        if (!user) {
            return res.status(400).json({
                error: "User does not exist with that email"
            })
        }

        bcrypt.compare(password, user.password).then(match => {
            if (!match) {
                return res.status(400).json({
                    error: "Incorrect password"
                })
            }

            const token = jwt.sign({ _id: user._id }, "todolist@123", { expiresIn: 100000 });
            return res.json({
                message: "User logged in successfully",
                token
            })
        })
    })
})

// get user
router.get("/user", authMiddleware, (req, res) => {
    User.findById(req.user._id).then(user => {
        return res.json({
            user
        })
    })
})


module.exports = router