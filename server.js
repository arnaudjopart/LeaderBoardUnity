var express = require('express');
var app = express();
var PORT = process.env.PORT||3000;

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

// app.get('/about',middleware.requireAuthentication, function(req,res){
//   res.send("About us");
// });


//app.use(express.static(__dirname+"/public"));

app.listen(PORT,function(){
  console.log("Express Server started on "+PORT+"!");
});
