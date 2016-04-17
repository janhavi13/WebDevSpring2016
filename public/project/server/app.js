module.exports=function(app,uuid,db,mongoose){
    // j var userModel=require("./model/user.model.js")(uuid,db);
    //j var songModel=require("./model/song.model.js")(uuid,db);



  // j  var userService = require("./services/user.service.server.js")(app,userModel);
  //  var songService = require("./services/songs.service.server.js")(app,songModel);


    var userlikesSchema=require("./model/userlikes.schema.server.js")(mongoose);
    console.log("db connnection", mongoose);
    var relationModel = mongoose.model('ProjectRelations',userlikesSchema);

    var userModel=require("./model/user.model.js")(uuid,db,mongoose,relationModel);
    var songModel=require("./model/song.model.js")(uuid,db,mongoose,relationModel);


    var userService = require("./services/user.service.server.js")(app, userModel, songModel);
    var songService = require("./services/songs.service.server.js")(app,songModel);

}