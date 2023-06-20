const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  teamName: String,
  teamStadium: String,
  teamOwner: String,
 
});

// Create Model Name "Team"
const team = mongoose.model("Team", teamSchema);

// Make Team exportable
module.exports = team;
