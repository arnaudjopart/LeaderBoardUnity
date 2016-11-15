var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require ('body-parser');
var PORT = process.env.PORT||3000;

var Sequelize = require('sequelize');
var sequelize = New Sequelize(undefined, undefined, undefined,{
  'dialect':'sqlite',
  'storage':'basic-sqlite-database.sqlite'
});

sequelize.sync().then(function(){
  console.log('Everything is synced.');
});

var scoreNextId = 1;

app.use(bodyParser.json());

var leaderboard=[];

var middleware = require('./middleware.js');


//app.use(middleware.logger);

app.get('/leaderboard', function(req,res){
  res.json(leaderboard);
});

app.get('/leaderboard/:id', function(req,res){
  var leaderboardId = parseInt(req.params.id,10);
  var matchedEntry =_.findWhere(leaderboard,{id:leaderboardId});

  if(matchedEntry){
    console.log("found id");
    res.json(matchedEntry);
  }else{
    res.status(404).send();
  }

});

app.post('/leaderboard',function(req,res){
  var body = _.pick(req.body,'playerName','score');

  if(!_.isString(body.playerName)||body.playerName.trim().length===0){
    return res.status(400).send();
  }
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
