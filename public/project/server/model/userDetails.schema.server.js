var mongoose= require ("mongoose");

module.exports =function(){


   // var SongSchema = require("./songs.schema.server.js")(mongoose);


    var UserSchema =mongoose.Schema(
        {username:String,
            password:String,
            firstName:String,
            lastName:String,
            emails:[String],
            roles:[String],
            phones:[String],

        },
        {collection :'userDetails'});
    return UserSchema;
};