
module.exports=function(app,uuid){
    var userModel=require("./models/user.model.js")(uuid);
    var userEventModel=require("./models/userEvent.model.js")(uuid);

    var userService = require("./services/user.service.server.js")(app,userModel);
}