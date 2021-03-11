const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  id: { type: String },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
