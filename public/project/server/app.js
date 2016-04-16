module.exports=function(app,uuid,db){
    var userModel=require("./model/user.model.js")(uuid,db);
    var songModel=require("./model/song.model.js")(uuid,db);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var eventService = require("./services/songs.service.server.js")(app,songModel);

}