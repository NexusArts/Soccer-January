const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  pwd: String,
  avatar: String,
});

// Create Model "User"
const user = mongoose.model("User", userSchema);

// Make User exportable
module.exports = user;
