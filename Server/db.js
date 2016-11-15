var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined,{
  'dialect':'sqlite',
  'storage':__dirname+'/data/game-api.sqlite'
});

sequelize.sync().then(function(){
  console.log('Everything is synced.');
});

var db={};

db.leaderboard = sequelize.import(__dirname+"/models/leaderboard.js");
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
