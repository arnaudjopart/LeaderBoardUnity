var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require ('body-parser');
var PORT = process.env.PORT||3000;

var db = require('./db.js');

var scoreNextId = 1;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/leaderboard/top/:nb',function(req,res){
  var nb = req.params.nb;
  db.leaderboard.findAll({order:[['score','DESC']],limit:nb}).then(function(entries){
    if(entries){
      res.json(entries);
    }else{
      res.status(400).send()
    }
  },function(e){
    res.status(404).send(e);
  });

});

app.get('/leaderboard/local/:nb',function(req,res){
  var nb = req.params.nb;
  db.leaderboard.findAll({order:[['score','ASC']],where:["score>?",10],limit:nb}).then(function(entries){
    if(entries){
      res.json(entries);
    }else{
      res.status(400).send();
    }
  },function(e){
    res.status(404).send();
  });
});
app.get('/leaderboard/:playerName',function(req,res){
  var name = req.params.playerName;
  var matchedEntry;

  console.log("Looking for "+name);
  db.leaderboard.findOne({where:{playerName:name}}).then(function(entry){
    if(entry){
      matchedEntry = entry;

      SendData(matchedEntry,res);
    }else{
      res.status(404).send();
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
  console.log("Unity data: "+req.body.message);
  var parse = JSON.parse(req.body.message);
  console.log(parse);
  var body = _.pick(parse,'playerName','score');
  console.log(body);
  db.leaderboard.create(body).then(function(entry){
    res.json(entry.toJSON());

  }, function(e){
    res.status(400).json(e);
  });

});

function SendData(entry,res){
  var score;
  var nbOfplayers;
  var rank;

  score =parseInt(entry.toJSON().score);
  console.log(score);
  console.log("preparing data...");

  db.leaderboard.count().then(function(c){
    console.log("number of players: "+c);
    nbOfplayers = c;
  },function(e){
    res.status(400).send();
  }).then(function(){
    db.leaderboard.count({where:["score>?",score]}).then(function(c){
      console.log("higher score: "+c);
      rank = c+1;
      //console.log(name+" has rank n° "+ rank);
      var data = {};
      data.entry = entry;
      data.nbOfplayers= nbOfplayers;
      data.rank = rank;
      res.json(data);
    },function(e){
      res.status(400).send();
    });
  });
}
// app.get('/about',middleware.requireAuthentication, function(req,res){
//   res.send("About us");
// });


//app.use(express.static(__dirname+"/public"));
db.sequelize.sync().then(function(){
  app.listen(PORT,function(){
    console.log("Express Server started on "+PORT+"!");
  });
});
