const router = require("express").Router();

const { Mongoose } = require("mongoose");
const authMiddleware = require("../middleware/auth.middleware");
const PostMessage = require("../models/postMessage");

//Crud = Create
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newPost = await PostMessage.create(req.body);

    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

//cRud = Read
router.get("/", async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    return res.status(200).json(postMessages);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

//crUd = Update
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedPost = await PostMessage.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ msg: "Post not found!" });
    }

    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.patch("/:id/likePost", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) return res.json({ msg: "Unauthenticaded" });

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex(
      (userId) => userId === String(req.userId)
    );

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((userId) => userId !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
      {
        _id: id,
      },
      post,
      { new: true }
    );

    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

//cruD = Delete
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // if (!req.userId) return res.json({ msg: "Unauthenticaded" });

    const post = await PostMessage.findById(id);

    if (req.userId !== post.owner) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    const deletedPost = await PostMessage.findByIdAndRemove({
      _id: id,
    });

    if (!deletedPost) {
      return res.status(404).json({ msg: "Post not found!" });
    }

    return res
      .status(200)
      .json({ msg: "You've deleted your post successfully!" });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
