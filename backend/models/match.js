const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
  scoreOne: Number,
  scoreTwo: Number,
  teamOne: String,
  teamTwo: String,
});

// Create Model Name "Match"
const match = mongoose.model("Match", matchSchema);

// Make Match exportable
module.exports = match;
