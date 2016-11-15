var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined,{
  'dialect':'sqlite',
  'storage':'basic-sqlite-database.sqlite'
});

var Leaderboard = sequelize.define('Leaderboard-CuriousBusinessCard',{
  playerName:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:true
    }
  },
  score:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
});
sequelize.sync({force:true}).then(function(){
  console.log('Everything is synced.');
  Leaderboard.create({
    playerName:"Arnaud",
    score:150
  }).then(function(entry){
    console.log(entry);

  });

});
