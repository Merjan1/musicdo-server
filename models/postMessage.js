const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  caption: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  creationDate: {
    type: Date,
    default: new Date(),
  },
  owner: String, //{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const PostMessage = mongoose.model("PostMessage", postSchema);

module.exports = PostMessage;
