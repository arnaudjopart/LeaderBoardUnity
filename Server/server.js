var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require ('body-parser');
var PORT = process.env.PORT||3000;

var db = require('./db.js');

var scoreNextId = 1;

app.use(bodyParser.json());

var leaderboard=[];

var middleware = require('./middleware.js');


//app.use(middleware.logger);

app.get('/leaderboard', function(req,res){
  db.leaderboard.findAll().then(function(entries){
    if(entries){
      res.json(entries);
    }
  },function(e){
    res.status(404).send(e);
  });
});

app.get('/leaderboard/:playerName',function(req,res){
  var name = req.params.playerName;
  var score;
  console.log("Looking for "+name);
  db.leaderboard.findOne({where:{playerName:name}}).then(function(entry){
    if(entry){
      score =parseInt(entry.toJSON().score);
      console.log(score);
      res.json(entry.toJSON());
      db.leaderboard.count().then(function(c){
        console.log("number of players: "+c);
      },function(e){

      });
      db.leaderboard.count({where:["score>?",score]}).then(function(c){
        console.log("higher score: "+c);
      })
    }else{
      res.status(400).send();

    }
  },function(e){
    res.status(404).send(e);
  });

});
app.get('/leaderboard/:id', function(req,res){
  var leaderboardId = parseInt(req.params.id,10);
  db.leaderboard.findById(leaderboardId).then(function(entry){
    if(entry){
      res.json(entry.toJSON());
    }else{
      res.status(400).send();
    }
  },function(e){
    res.status(400).send(e);
  });
});

app.post('/leaderboard',function(req,res){
  var body = _.pick(req.body,'playerName','score');

  db.leaderboard.create(body).then(function(entry){
    res.json(entry.toJSON());

  }, function(e){
    res.status(400).json(e);
  });
  // if(!_.isString(body.playerName)||body.playerName.trim().length===0){
  //   return res.status(400).send();
  // }
  // body.id = scoreNextId;
  // scoreNextId++;
  // leaderboard.push(body);
  // //console.log(body.playerName);
  // res.json(body);

});

// app.get('/about',middleware.requireAuthentication, function(req,res){
//   res.send("About us");
// });


//app.use(express.static(__dirname+"/public"));
db.sequelize.sync().then(function(){
  app.listen(PORT,function(){
    console.log("Express Server started on "+PORT+"!");
  });
});
