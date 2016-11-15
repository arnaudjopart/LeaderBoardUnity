
var middleware =  {
  requireAuthentication: function(req,res,next){
    console.log("private route hit");
    next();
  },
  logger:function(req,res,next){
    console.log("Request: " + new Date().toString()+" "+req.method+" "+req.url);
    next();
  }
};


module.exports = middleware
