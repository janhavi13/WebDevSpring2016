var mongoose= require ("mongoose");

module.exports =function(){

   var UserSchema =mongoose.Schema(
       {username:String,
       password:String,
       firstName:String,
       lastName:String,
       emails:[String],
       phones:[String]},{collection :'user'});
    return UserSchema;


};


module.exports = function (mongoose,db) {

    var UserSchema = new mongoose.Schema({
        userid:String,
        username:String,
        firstname:String,
        lastname:String,
        email:String,
        password:String

    });

    //var UserModel = mongoose.model("UserModel" , UserSchema);
    return UserSchema;
};