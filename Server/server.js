var express = require('express');
var app = express();
var bodyParser = require ('body-parser');
var PORT = process.env.PORT||3000;

var scoreNextId = 1;

app.use(bodyParser.json());

var leaderboard = [{
  id:1,
  playerName:"John Doo",
  score:100
},{
  id:2,
  playerName:"Jane Doo",
  score:50
},{
  id:3,
  playerName:"Hadrien",
  score:250
},{
  id:4,
  playerName:"Raphael",
  score:150
}];

var middleware = require('./middleware.js');


//app.use(middleware.logger);

app.get('/leaderboard', function(req,res){
  res.json(leaderboard);
});

app.get('/leaderboard/:id', function(req,res){
  var leaderboardId = parseInt(req.params.id,10);
  var matchedEntry;

  leaderboard.forEach(function(entry){
    if(leaderboardId === entry.id){
      matchedEntry = entry;
    }
  });

  if(matchedEntry){
    console.log("found id");
    res.json(matchedEntry);
  }else{
    //res.status(404).send();
  }

});

app.post('/leaderboard',function(req,res){
  var body = req.body;
  body.id = scoreNextId;
  scoreNextId++;
  leaderboard.push(body);
  //console.log(body.playerName);
  res.json(body);

});

// app.get('/about',middleware.requireAuthentication, function(req,res){
//   res.send("About us");
// });


//app.use(express.static(__dirname+"/public"));

app.listen(PORT,function(){
  console.log("Express Server started on "+PORT+"!");
});
