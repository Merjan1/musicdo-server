const router = require("express").Router();

const PostMessage = require("../models/postMessage");

//Crud = Create
router.post("/posts", async (req, res) => {
  try {
    const newPost = await PostMessage.create(req.body);

    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

//cRud = Read
router.get("/posts", async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);

    return res.status(200).json(postMessages);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
