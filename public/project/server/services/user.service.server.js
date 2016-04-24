var passport=require('passport');
var LocalStrategy =require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");


module.exports = function(app,userModel, songModel) {

    var auth=authorized;
    app.post('/api/project/login', passport.authenticate('local'), login);
    app.post('/api/project/logout',logout);
    app.get('/api/project/loggedin',loggedin);
    app.post("/api/project/addNewUser",auth,addNewUser);
    app.post('/api/project/register',register);

    app.put("/api/project/updateUser/:id",auth,updateUser);
    //app.put("/api/project/updateUser/:id",updateUser);
    app.delete("/api/project/deleteUser/:id",auth,deleteUser);
    app.get("/api/project/getAllUsers",auth,getAllUsers);
    app.get("/api/project/getUserByUserName/:username",getUserByUserName);
    app.get("/api/project/getUserById/:id",getUserById);
    app.get("/api/project/getlikedsongs/:id", getLikedSongs);


    app.post("/api/project/addfollowing",addFollowing);
    app.delete("/api/project/removefollowing/:userID/:followingID",removeFollowing);
    app.get("/api/project/following/:userID/:followingID",checkIfFollowed);
    app.get("/api/project/getfollowing/:userID",getFollowing);
    app.get("/api/project/getfollowers/:userID",getFollowers);



    // app.get("/api/project/profile/:id", profile);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (user  && bcrypt.compareSync(password,user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }

                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .getUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        console.log(req);
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createNewUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function updateUser(req, res) {
        var id=req.params.id;
        var updatedUser = req.body;

        userModel
            .getUserById(id)
            .then(function(user) {

                    if(user) {
                        //check if the password was updated by user and handle accordingly
                        if(user.password != updatedUser.password) {
                            updatedUser.password = bcrypt.hashSync(updatedUser.password);

                        } /*&& !bcrypt.compareSync(user.password, updatedUser.password)) {
                            updatedUser.password = bcrypt.hashSync(updatedUser.password);*/


                        // user.password != updatedUser.password && !bcrypt.compareSync(user.password, updatedUser.password)

                        userModel
                            .updateUser(id, updatedUser)
                            .then(
                                //login in promise resolved
                                function(doc){
                                    req.session.currentUser = doc;
                                    res.json(doc);
                                },
                                //send error if promise rejected
                                function(err){
                                    res.status(400).send(err);
                                }
                            )
                    }else{
                        res.send(400);
                    }
                },
                function(err){
                    res.status(400).send(err);
                });
    }


   /* function updateUser(req,res) {
        var id=req.params.id;
        var updatedUserDetails = req.body;

        if(!isAdmin(req.user)) {
            updatedUserDetails.roles=["student"];
        }
        if(typeof updatedUserDetails.roles == "string") {
            updatedUserDetails.roles = updatedUserDetails.roles.split(",");
        }

        userModel
            .findUserByUsername(updatedUserDetails.username)
            .then(function(user){
                    if(!user) {
                        res.json(null);
                    }
                    else{
                        updatedUserDetails.password = bcrypt.hashSync(updatedUserDetails.password);
                        userModel.updateUser(id,updatedUserDetails)
                            .then(function(user){
                                    userModel.getUserById(id)
                                        .then(function (response){
                                                res.json(response);
                                            },
                                            function(err){
                                                res.status(400).send(err);
                                            });
                                },
                                function(err){
                                    res.status(400).send(err);
                                });
                    }
                },
                function(err){
                    res.status(400).send(err);
                });
    }
*/


    /*function updateUser(req,res){
        var id=req.params.id;
        var updatedUserDetails = req.body;

        if(!isAdmin(req.user)) {
            delete updatedUserDetails.roles;
            updatedUserDetails.roles=["student"];
        }
        if(typeof updatedUserDetails.roles == "string") {
            updatedUserDetails.roles = updatedUserDetails.roles.split(",");

        }
        updatedUserDetails.password = bcrypt.hashSync(updatedUserDetails.password);
        userModel.updateUser(id,updatedUserDetails)
            .then(function(user){
                    userModel.getUserById(id)
                        .then(function (response){
                                res.json(response);
                            },
                            function(err){
                                res.status(400).send(err);
                            });
                },
                function(err){

                    res.status(400).send(err);
                });
    }*/

    function deleteUser(req,res){
        if(isAdmin(req.user)){
            var userId =req.params.id;
            userModel.deleteUser(userId)
                .then(function(stats){
                        res.send(200);
                    },
                    function(err){
                        res.status(400).send(err);
                    })
                .then(function(users){
                    res.json(users);
                }, function (err) {
                    res.status.send(err);
                });
        }
    }

    function getAllUsers(req,res) {
        if(isAdmin(req.user)){
            userModel.findAllUsers()
                .then(function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        }else{
            res.status(403);
        }
    }

    function getUserByUserName(req,res){
        var username=req.params.username;
        var user = userModel.getUserByUserName(username);
        res.json(user);
    }

    function getUserById(req,res) {
        userModel
            .getUserById(req.params.id)
            .then(function(user) {

                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function addNewUser(req,res){
        var newUser=req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles;
        } else {
            newUser.roles = ['student'];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return userModel.createNewUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        res.json(user);
                    }else{
                        res.json(null);
                    }},
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function getLikedSongs(req, res) {
        var userId = req.params.id;
        songModel.getLikedSongs(userId)
            .then(function(songs) {

                res.send(songs);
            },function(err){
                res.status(400).send(err);
            });

    }


    function addFollowing(req, res) {
        var details = req.body;

        userModel
            .addFollowing(details)
            .then(
                //login in promise resolved
                function(doc) {
                    res.json(doc);
                },
                //send error if promise rejected
                function(err) {
                    res.status(400).send(err);

                }
            );
    }

    function removeFollowing(req, res) {

        var userID = req.params.userID;
        var followingID = req.params.followingID;

        userModel
            .removeFollowing(userID,followingID)
            .then(
                //login in promise resolved
                function(doc) {

                    res.json(doc);
                },

                function(err) {

                    res.status(400).send(err);

                }
            );
    }

    function checkIfFollowed(req,res) {
        var userID = req.params.userID;
        var followingID = req.params.followingID;

        userModel
            .checkIfFollowed(userID, followingID)
            .then(function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                });

    }

    function getFollowing(req, res) {
        var userID = req.params.userID;

        userModel
            .getFollowing(userID)
            .then(function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function getFollowers(req, res) {
        var userID = req.params.userID;

        userModel
            .getFollowers(userID)
            .then(function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }
}






