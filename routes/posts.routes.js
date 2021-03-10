const router = require("express").Router();

const { Mongoose } = require("mongoose");
const PostMessage = require("../models/postMessage");

//Crud = Create
router.post("/", async (req, res) => {
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
    console.log(postMessages);

    return res.status(200).json(postMessages);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

//crUd = Update
router.patch("/:id", async (req, res) => {
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

module.exports = router;
