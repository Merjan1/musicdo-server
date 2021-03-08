const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  caption: String,
  creator: String,
  tags: [String],
  picture: String,
  likeCount: { type: Number, default: 0 },
  creationDate: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

module.exports = PostMessage;
