var passport=require('passport');
var LocalStrategy =require('passport-local').Strategy;

module.exports = function(app,userModel) {

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

    app.get("/api/project/profile/:id", profile);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {

        userModel
            .findUserByCredentials( username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
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

    function updateUser(req,res){
        var id=req.params.id;
        var updatedUserDetails = req.body;

        if(!isAdmin(req.user)) {
            delete updatedUserDetails.roles;
            updatedUserDetails.roles=["student"];
        }
        if(typeof updatedUserDetails.roles == "string") {
            updatedUserDetails.roles = updatedUserDetails.roles.split(",");
            console.log("splitted the roles",updatedUserDetails.roles);
        }

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
                    console.log("error");
                    res.status(400).send(err);
                });
    }

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

    function getAllUsers(req,res){
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

    function getUserById(req,res){
        var id=rq.params.id;
        var user=userModel.getUserById(id);
        return user;
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



    function profile(req, res) {
        var userId = req.params.id;
        var user = null;

        // use model to find user by id
        userModel.findUserById(id)
            .then(

                // first retrieve the user by user id
                function (doc) {

                    user = doc;

                    // fetch movies this user likes
                    return songModel.findSongsBySongIDs(doc.likes);
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch movies this user likes
                function (songs) {

                    // list of movies this user likes
                    // movies are not stored in database
                    // only added for UI rendering
                    user.likesSongs = songs;
                    res.json(user);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
}







//----------------------------------------------
/*
module.exports = function(app,userModel) {
    app.get("/api/project/user/:username/:password", findUserByCredentails);
    app.post("/api/project/register", register);
    app.put("/api/project/updateUser/:id",updateUser);
    app.delete("/api/project/deleteUser/:id",deleteUser);
    app.get("/api/project/getAllUsers/",getAllUsers);
    app.get("/api/project/getUserByUserName/:username",getUserByUserName);
    app.get("/api/project/getUserById/:id",getUserById);
    app.get("/api/project/profile/:id", profile);


    function findUserByCredentails(req,res){
        var username=req.params.username;
        var password=req.params.password;

        userModel.findUserByCredentials(username,password)
            .then(function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function register(req,res){
        // username validation will be added when we implement passport
        var userDetails = req.body;
        userModel.createNewUser(userDetails)
            .then(function(user) {
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function updateUser(req,res){
        console.log("upadteuser");
        var id=req.params.id;
        var updatedUserDetails = req.body;


        userModel.updateUser(id,updatedUserDetails)
            .then(function(user){
                    console.log("1st response",user);

                    userModel.getUserById(id)
                        .then(function (response){
                                console.log("2nd response",response);
                                res.json(response);
                            },
                            function(err){
                                res.status(400).send(err);
                            });


                },
                function(err){
                    console.log("error");
                    res.status(400).send(err);
                });
    }

    function deleteUser(req,res){
        var id=req.params.id;
        userModel.deleteUser(id);
    }

    function getAllUsers(req,res){
        userModel.getAllUsers(id);
    }

    function getUserByUserName(req,res){
        var username=req.params.username;
        var user = userModel.getUserByUserName(username);
        res.json(user);
    }

    function getUserById(req,res){
        console.log("getuserbyid");
        var id=rq.params.id;
        var user=userModel.getUserById(id);
        return user;
    }

    function profile(req, res) {
        var userId = req.params.id;
        var user = null;

        // use model to find user by id
        userModel.findUserById(id)
            .then(

                // first retrieve the user by user id
                function (doc) {

                    user = doc;

                    // fetch movies this user likes
                    return songModel.findSongsBySongIDs(doc.likes);
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch movies this user likes
                function (songs) {

                    // list of movies this user likes
                    // movies are not stored in database
                    // only added for UI rendering
                    user.likesSongs = songs;
                    res.json(user);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

}
*/