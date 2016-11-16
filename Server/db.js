var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';

var sequelize;

if(env==='production'){
  sequelize = new Sequelize(process.env.DATABASE_URL,{
    'dialect':'postgres'
  });
}else{
  sequelize = new Sequelize(undefined, undefined, undefined,{
    'dialect':'sqlite',
    'storage':__dirname+'/data/game-api.sqlite'
  });
}

sequelize.sync().then(function(){
  console.log('Everything is synced.');
});


var db={};

db.leaderboard = sequelize.import(__dirname+"/models/leaderboard.js");
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
