// make router

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Tag = require("../models/Tags");
const authMiddleware = require("../middleware/auth.middleware");

// create tags
router.post("/create", authMiddleware, (req, res) => {
	const { name } = req.body;
	var colorArray = [
		"#FF6633",
		"#FFB399",
		"#FF33FF",
		"#FFFF99",
		"#00B3E6",
		"#E6B333",
		"#3366E6",
		"#999966",
		"#99FF99",
		"#B34D4D",
		"#80B300",
		"#809900",
		"#E6B3B3",
		"#6680B3",
		"#66991A",
		"#FF99E6",
		"#CCFF1A",
		"#FF1A66",
		"#E6331A",
		"#33FFCC",
		"#66994D",
		"#B366CC",
		"#4D8000",
		"#B33300",
		"#CC80CC",
		"#66664D",
		"#991AFF",
		"#E666FF",
		"#4DB3FF",
		"#1AB399",
		"#E666B3",
		"#33991A",
		"#CC9999",
		"#B3B31A",
		"#00E680",
		"#4D8066",
		"#809980",
		"#E6FF80",
		"#1AFF33",
		"#999933",
		"#FF3380",
		"#CCCC00",
		"#66E64D",
		"#4D80CC",
		"#9900B3",
		"#E64D66",
		"#4DB380",
		"#FF4D4D",
		"#99E6E6",
		"#6666FF",
	];
    const color = colorArray[Math.floor(Math.random() * colorArray.length)];
	const tag = new Tag({
		name,
		color,
		author: req.user._id,
	});
	tag.save().then((tag) => {
		res.status(201).json({ message: "Tag created successfully", tag });
	});
});

router.get("/all", authMiddleware, (req, res) => {
    Tag.find({ author: req.user._id }).then((tags) => {
        res.status(200).json({ tags });
    });
});

router.get("/:id", authMiddleware, (req, res) => {
    Tag.findOne({ _id: req.params.id, author: req.user._id }).then((tag) => {
        res.status(200).json({ tag });
    });
})

router.put("/:id", authMiddleware, (req, res) => {
    Tag.findOneAndUpdate({ _id: req.params.id, author: req.user._id }, req.body, { new: true }).then((tag) => {
        res.status(200).json({ message: "Tag updated successfully", tag });
    });
})

router.delete("/:id", authMiddleware, (req, res) => {
    Tag.findOneAndDelete({ _id: req.params.id, author: req.user._id }).then((tag) => {
        res.status(200).json({ message: "Tag deleted successfully" });
    });
})

module.exports = router;