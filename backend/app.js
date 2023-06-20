// import express module
const express = require("express");

// import body parser module
const bodyParser = require("body-parser");

// import bcrypt module
const bcrypt = require("bcrypt");

// import mongoose module
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ChawkiBrosDB");

// import multer module
const multer = require("multer");
// import path module
const path = require("path");
// import axios module
const axios = require("axios");

// create app express
const app = express();

// Models Importation
const Match = require("./models/match");
const Team = require("./models/team");
const User = require("./models/user");

//Appliction Congfig
// confi body-parser (1_EXTRACT OBJECT FROM REQUEST., 2_send JSON RESPONSE)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

// Path ShortCut
app.use('/myFiles', express.static(path.join('backend/images')));

// Acceptable Media types
const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
 }
 const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
  const isValid = MIME_TYPE[file.mimetype];
  let error = new Error("Mime type is invalid");
  if (isValid) {
  error = null;
}
cb(null, 'backend/images')
},
filename: (req, file, cb) => {
const name = file.originalname.toLowerCase().split(' ').join('-');
const extension = MIME_TYPE[file.mimetype];
const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
extension;
cb(null, imgName);
}
});

// DB Simulation
let matchesTab = [
  { id: 1, scoreOne: 1, scoreTwo: 3, teamOne: "CA", teamTwo: "EST" },
  { id: 2, scoreOne: 2, scoreTwo: 0, teamOne: "UTD", teamTwo: "ARS" },
  { id: 3, scoreOne: 4, scoreTwo: 4, teamOne: "BAR", teamTwo: "RMD" },
  { id: 4, scoreOne: 0, scoreTwo: 2, teamOne: "LIV", teamTwo: "INT" },
];

function generateId(T) {
  let max;
  if (T.length == 0) {
    max = 0;
  } else {
    max = T[0].id;
    for (let i = 1; i < T.length; i++) {
      if (T[i].id > max) {
        max = T[i].id;
      }
    }
  }
  return max + 1;
}

let playersTab = [
  { id: 1, age: 19, number: 9, name: "Ronaldo", position: "ATK" },
  { id: 2, age: 23, number: 3, name: "Stam", position: "DEF" },
  { id: 3, age: 33, number: 11, name: "Figo", position: "MID" },
  { id: 4, age: 39, number: 10, name: "Messi", position: "RW" },
];

let teamsTab = [
  { id: 1, name: "Real madrid", owner: "Ronaldo", stadium: "Bernbeiu" },
  { id: 2, name: "Barcelona", owner: "Messi", stadium: "Camp neu" },
  { id: 3, name: "Man United", owner: "Alex", stadium: "Old Traford" },
  { id: 4, name: "EST", owner: "Meddeb", stadium: "Rades" },
];

//  <<<<<<<<<<<<<<<<----MATCHES----->>>>>>>>>>>>>>>

// Business Logic : Get All Matches

app.get("/api/matches/", (req, res) => {
  console.log("hereeeeeeeee intooooo get all matches");
  Match.find().then((docs) => {
    res.status(200).json({ matches: docs, message: "OK" });
  });
});

// Business Logic : Get  Match by ID

app.get("/api/matches/:x", (req, res) => {
  console.log("here into get Match by ID");
  let id = req.params.x;
  Match.findOne({ _id: id }).then((doc) => {
    res.status(200).json({ matches: doc, message: "OK" });
  });
});

// Business Logic : Delete Match

app.delete("/api/matches/:id", (req, res) => {
  console.log("here into BL: Delete Match By ID");

  let id = req.params.id;
  Match.deleteOne({ _id: id }).then((result) => {
    console.log("here response after delete", result);
    result.deletedCount == 1
      ? res.json({ msg: "deleted with success" })
      : res.json({ msg: "not deleted" });
  });
});

// Business Logic : Add Match

app.post("/api/matches", (req, res) => {
  console.log("here into BL: Add Match");
  let obj = new Match(req.body);
  obj.save();
  res.json({ message: "match added successfully" });
});

// Business Logic : Edit Match

app.put("/api/matches", (req, res) => {
  console.log("here into BL: Edit Team");
  let newMatch = req.body;
  Match.updateOne({ _id: newMatch._id }, newMatch).then((result) => {
    console.log("here response after modification", result);
    result.nModified == 1
      ? res.json({ msg: "edited with success" })
      : res.json({ msg: "echec" });
  });
});

// Business Logic : search  Match by score 1 and score 2
// app.post("/api/matches/searchMatches", (req, res) => {
//   console.log("here into BL : Search All matches", req.body)
//  Match.find({ scoreOne: req.body.scoreOne,scoreTwo: req.body.scoreTwo }).then(
//  (docs)=>{
//   res.json({matchesFound: docs})
//  }
//  )
// });

// with $or:[{ condition1 }, {condition2 }]
app.post("/api/matches/searchMatches", (req, res) => {
  console.log("here into BL : Search All matches", req.body)
 Match.find({$or: [{ scoreOne: req.body.scoreOne }, {scoreTwo: req.body.scoreTwo }]}).then(
 (docs)=>{
  res.json({matchesFound: docs})
 }
 )
});

// Business Logic : search  Weather
app.get("/api/weather/:city", (req, res) => {
  console.log(req.params)
  console.log("city: " , req.params.city);
  const city = req.params.city
  const key = "62ee756a34835483299877a61961cafb";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(apiURL).then((response) => {
  console.log('Here response', response);
  console.log(response.data.weather[0].icon)
  const weather = response.data.main;
  const cycle =  response.data.sys
  console.log('Here weather main', weather);
  const result = {
  temp: weather.temp,
  pressure: weather.pressure,
  humidity:weather.humidity,
  sunset: cycle.sunrise,
  sunrise: cycle.sunset,
  icon: response.data.weather[0].icon
  }
  res.status(200).json({
  result:result
  })
  });
 });

//  <<<<<<<<<<<<<<<<----PLAYERS----->>>>>>>>>>>>>>>

// Business Logic : Get All Players

app.get("/api/players/", (req, res) => {
  console.log("hereeeeeeeee intooooo get all players");
  res.status(200).json({ players: playersTab, message: "OK" });
});

// Business Logic : Get  Player by ID

app.get("/api/players/:x", (req, res) => {
  console.log("here into get Player by ID");
  let id = req.params.x;
  let foundPlayer = playersTab.find((elt) => {
    return elt.id == id;
  });
  res.json({ player: foundPlayer });
});

// Business Logic : Delete Player

app.delete("/api/players/:id", (req, res) => {
  console.log("here into BL: Delete Player By ID");

  let id = req.params.id;
  let isFound = false;

  for (let i = 0; i < playersTab.length; i++) {
    if (playersTab[i].id == id) {
      isFound = true;
      playersTab.splice(i, 1);
      break;
    }
  }
  isFound
    ? res.json({ message: "success" })
    : res.json({ message: "ID NOT FOUND" });
});

// Business Logic : Add Player

app.post("/api/players", (req, res) => {
  console.log("here into BL: Add Player");
  let obj = req.body;
  console.log("here obj", obj);
  playersTab.push(obj);
  res.json({ message: "player added successfully" });
});

// Business Logic : Edit Player

app.put("/api/players", (req, res) => {
  console.log("here into BL: Edit Player");
});

//  <<<<<<<<<<<<<<<<----TEAMS----->>>>>>>>>>>>>>>

// Business Logic : Get All Teams

app.get("/api/teams/", (req, res) => {
  console.log("hereeeeeeeee intooooo get all teams");
  res.status(200).json({ teams: teamsTab, message: "OK" });
});

// Business Logic : Get  Teams by ID

app.get("/api/teams/:x", (req, res) => {
  console.log("here into get Team by ID");
  let id = req.params.x;
  let foundTeam = teamsTab.find((elt) => {
    return elt.id == id;
  });
  res.json({ team: foundTeam });
});

// Business Logic : Delete Team

app.delete("/api/teams/:id", (req, res) => {
  console.log("here into BL: Delete Team By ID");

  let id = req.params.id;
  let isFound = false;

  for (let i = 0; i < teamsTab.length; i++) {
    if (teamsTab[i].id == id) {
      isFound = true;
      teamsTab.splice(i, 1);
      break;
    }
  }
  isFound
    ? res.json({ message: "success" })
    : res.json({ message: "ID NOT FOUND" });
});

// Business Logic : Add Team

app.post("/api/teams", (req, res) => {
  console.log("here into BL: Add Team");
  let teamObj = new Team({
    teamName: req.body.name,
    teamStadium: req.body.stadium,
    teamOwner: req.body.owner,
  });

  teamObj.save();
  teamObj.save((err, doc) => {
    console.log("Here error", err);
    console.log("Here doc", doc);
    err ? res.json({ msg: "error" }) : res.json({ msg: "addded with success" });
  });
});

// Business Logic : Edit Team

app.put("/api/matches", (req, res) => {
  console.log("here into BL: Edit Team");
  for (let i = 0; i < matchesTab.length; i++) {
    if (matchesTab[i].id == req.body.id) {
      matchesTab[i] = req.body;
      res.json({ message: "match edited successfully" });
    }
  }
});

//  <<<<<<<<<<<<<<<<----USERS----->>>>>>>>>>>>>>>

// Business Logic : Sign Up

app.post("/api/users/signup", multer({ storage: storageConfig }).single('img'), (req, res) => {
  console.log("here into BL: Add User", req.body);
  bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
    console.log("here crypted pwd", cryptedPwd);
    req.body.pwd = cryptedPwd;
    req.body.avatar = req.body.avatar = `${req.protocol}"://${req.get('host')}/myFiles/${req.file.filename}`;
    let user = new User(req.body);
    user.save((err, doc) => {
      err
        ? res.json({ msg: "error" })
        : res.json({ msg: "addded with success" });
    });
  });
});

// Business Logic : Login

app.post("/api/users/login", (req, res) => {
  console.log("here into BL login", req.body);
  let user;
  User.findOne({ email: req.body.email })
    .then((doc) => {
      console.log("here doc", doc);
      user = doc;
      if (!doc) {
        res.json({ email: req.body.email });
      } else {
        return bcrypt.compare(req.body.pwd, doc.pwd);
      }
    })
    .then((isEqual) => {
      console.log("here isEqual", isEqual);
      //send pwd error msg
      if (!isEqual) {
        res.json({ msg: "please check PWD" });
      } else {
        let userToSend = {
          userId: user._id,
          email: user.email,
          fName: user.firstName,
          lName: user.lastName,
        };
        res.json({ user: userToSend, msg: `Welcome ${user.firstName}` });
      }
    });
});

// Profile
app.get("/api/users/:id", (req, res) => {
  console.log("here into get User by ID", req.params.id);
  let id = req.params.id;
  User.findOne({ _id: id }).then((doc) => {
    
    res.json({ user: doc });
  });

});

// make app importable to other files
module.exports = app;
