module.exports = function(sequelize,DataTypes){
  return leaderboard = sequelize.define('Leaderboard-CuriousBusinessCard',{
    playerName:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    },
    score:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  });
}
