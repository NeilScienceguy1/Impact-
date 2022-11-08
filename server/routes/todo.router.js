const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Todo = require("../models/Todo");
const Tag = require("../models/Tags");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/create", authMiddleware, (req, res) => {
	const { title, description, tags, dueDate } = req.body;

	const todo = new Todo({
		title,
		description,
		tags,
		dueDate,
		author: req.user._id,
	});

	todo.save().then((todo) => {
		res.status(201).json({ message: "Todo created successfully", todo });
	});
});

router.get("/filter/all/all", authMiddleware, (req, res) => {
	Todo.find({ author: req.user._id }).then((todos) => {
		res.status(200).json({ todos });
	});
});

router.get("/:id", authMiddleware, (req, res) => {
	Todo.findOne({ _id: req.params.id, author: req.user._id }).then((todo) => {
		res.status(200).json({ todo });
	});
});

router.put("/:id", authMiddleware, (req, res) => {
	const { title, description, tags, dueDate } = req.body;
	Todo.findOneAndUpdate(
		{ _id: req.params.id, author: req.user._id },
		{
			title,
			description,
			tags,
			dueDate,
		}
	).then((todo) => {
		res.status(200).json({ message: "Todo updated successfully", todo });
	});
});

router.delete("/:id", authMiddleware, (req, res) => {
	Todo.findOneAndDelete({ _id: req.params.id, author: req.user._id }).then(
		(todo) => {
			res.status(200).json({
				message: "Todo deleted successfully",
				todo,
			});
		}
	);
});

router.get("/filter/tag/:tag", authMiddleware, (req, res) => {
	Todo.find({ author: req.user._id, tags: {$all: req.params.tag} }).then((todos) => {
		res.status(200).json({ todos });
	});
});

router.get("/filter/date/:date", authMiddleware, (req, res) => {
	Todo.find({ author: req.user._id, dueDate: `${req.params.date}` }).then(
		(todos) => {
			res.status(200).json({ todos });
		}
	).catch(err => console.log(err))
});

router.put("/addtag/:id", authMiddleware, (req, res) => {
	Tag.findOne({ name: req.body.tag, author: req.user._id }).then((tag) => {
		if (tag) {
			return Todo.findOneAndUpdate(
				{ _id: req.params.id, author: req.user._id },
				{
					$push: { tags: `${tag._id}` },
				}
			).then((todo) => {
				res.status(200).json({
					message: "Tag added successfully",
					todo,
				});
			});
		} 
		return res.status(400).json({ message: "Tag not found" });
	});
});

router.put("/removetag/:id", authMiddleware, (req, res) => {
    Tag.findOne({ name: req.body.tag, author: req.user._id }).then((tag) => {
        Todo.findOneAndUpdate(
			{ _id: req.params.id, author: req.user._id },
			{
				$pull: { tags: `${tag._id}` },
			}
		).then((todo) => {
			res.status(200).json({ message: "Tag removed successfully", todo });
		});
    });
});

router.get("/tags/:id", authMiddleware, (req, res) => {
	Todo.findOne({ _id: req.params.id, author: req.user._id }).then((todo) => {
		Tag.find({ _id: { $in: todo.tags } }).then((tags) => {
			res.status(200).json({ tags });
		});
	});
});


module.exports = router;
