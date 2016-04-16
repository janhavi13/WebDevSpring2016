var mongoose=require("mongoose");
var q= require("q");

module.exports= function(db){

    var UserSchema=require("./userDetails.schema.server.js")();
    var User=mongoose.model("User",UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        createNewUser :createNewUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        getUserByUserName:getUserByUserName,
        getUserById:getUserById,
        findAllUsers:findAllUsers,
        findUsersByIds: findUsersByIds,
        userLikesSong: userLikesSong
    }
    return api;

    function findUserByCredentials(username,password) {
        return User.findOne({"username":username,"password":password})
    }

    function findUserByUsername(userName){
        var deferred= q.defer();
        User.findOne (
            {"username": userName},
            function (err, stats) {
                if(!err){
                    deferred.resolve(stats);
                }
                else{
                    deferred.reject(err);
                }
            } );
        return deferred.promise;
    }

    function updateUser (id, userDetails) {
        var deferred= q.defer();
        User.update (
            {"_id": id},
            {$set: {"username":userDetails.username,
                "password":userDetails.password,
                "firstName":userDetails.firstName,
                "lastName":userDetails.lastName,
                "emails":userDetails.emails,
                "phones":userDetails.phones,
                "roles":userDetails.roles}},
            function (err, stats) {
                if(!err){
                    deferred.resolve(stats);
                }
                else{
                    deferred.reject(err);
                }
            } );
        console.log("user details emails",userDetails.emails);
        return deferred.promise;
    }

    function createNewUser(userDetails){
        var deferred= q.defer();
        var userName=userDetails.username;
        var email=userDetails.email;
        console.log("user details",userDetails);
        User.create(userDetails,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                User.update({"username":userName},{$push:{"emails":email}},
                    function(err,res){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            User.findOne({"username":userName},function(err,resp){
                                if(err){
                                    deferred.reject(err);
                                }
                                else{
                                    deferred.resolve(resp);
                                }
                            })
                        }
                    });
            }
        });

        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred= q.defer();
        User.remove({"_id":id},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function getUserByUserName(username){
        var deferred= q.defer();
        User.findOne({"username":username},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function getUserById(id){
        var deferred= q.defer();
        User.findOne({"_id":id},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers(){

        var deferred = q.defer();
        User.find(function(err,users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUsersByIds (ids) {
        var users = [];
        for (var u in ids) {
            var user = getUserById (ids[u]);
            if (user) {
                users.push ({
                    username: user.username,
                    _id: user._id
                });
            }
        }
        return users;
    }

    function userLikesSong (id, song) {

        var deferred = q.defer();

        // find the user
        UserDetails.getUserById(id, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.likes.push (song.songID);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }



}





// ==============================================
/*var mongoose=require("mongoose");
var q= require("q");
//var mock = require("./user.mock.json");

module.exports= function(uuid,db){

    var UserSchema=require("./userDetails.schema.server.js")();
    var UserDetails=mongoose.model("UserDetails",UserSchema);


    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        createNewUser :createNewUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        getUserByUserName:getUserByUserName,
        getUserById:getUserById,
        findUsersByIds: findUsersByIds,
        userLikesSong: userLikesSong
    }
    return api;

    function findUserByCredentials(username,password) {
        return UserDetails.findOne({"username":username,"password":password})

    }

    function findUserByUsername(userName){
        var deferred= q.defer();
        UserDetails.findOne (
            {"username": userName},
            function (err, stats) {
                if(!err){
                    deferred.resolve(stats);
                }
                else{
                    deferred.reject(err);
                }
            } );
        return deferred.promise;
    }

    function updateUser (id, userDetails) {
        var deferred= q.defer();
        UserDetails.update (
            {"_id": id},
            {$set: {"username":userDetails.username,"password":userDetails.password,
                "firstName":userDetails.firstName,
                "lastName":userDetails.lastName,
                "emails":userDetails.emails,
                "phones":userDetails.phones}},
            function (err, stats) {
                if(!err){
                    console.log("&&&&");
                    deferred.resolve(stats);
                }
                else{
                    deferred.reject(err);
                }
            } );
        return deferred.promise;
    }

    function createNewUser(userDetails){
        var deferred= q.defer();
        UserDetails.create(userDetails,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteUser(id) {
        for (var u in mock) {
            if (mock[u]._id == id) {
                mock.splice(u, 1);
            }
        }
    }

    function getUserByUserName(username){
        for (var u in mock) {
            if (mock[u].username == username) {
                return mock[u];
            }
        }
        return null;
    }


    function getUserById(id){
        var deferred= q.defer();
        UserDetails.findOne({"_id":id},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    // add movie to user likes
    function userLikesSong (id, movie) {

        var deferred = q.defer();

        // find the user
        UserDetails.getUserById(id, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.likes.push (song.songID);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }



}*/




