module.exports = function(app, songModel) {
    app.get("/api/project/getlikedsong/:userid", getLikedSong);
    app.get("/api/project/comments/:songid", getSongComments);
    app.get("/api/project/checklike/:userid/:songID",checkIfLiked);
    app.post("/api/project/addlikedsong", addLikedSong);
    app.put("/api/project/updatecomment",updateComment);
    app.delete("/api/project/removelikedsongs/:userid/:songid",deleteSong);



    function getLikedSong(req,res){
        var userId  = req.params.userid;

        songModel.getLikedSong(userId)
            .then(function(songs){
                res.send(songs);
            },function(err){
                res.status(400).send(err);
            });
    };

    function checkIfLiked(req,res){
        var userId = req.params.userid;
        var songId = req.params.songID;

        songModel
            .checkIfLiked(userId,songId)
            .then(function(response){
                    res.send(response);
                },
                function(err){
                    res.status(400).send(err);
                });

    };

    function addLikedSong(req,res){
        var songDetails = req.body;
        songModel
            .addLikedSong(songDetails)
            .then(function(response){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                });

    };


    function updateComment(req,res){
        var updated = req.body;
        var userid = updated.userid;
        var songID = updated.songID;
        var comment = updated.comment;

        songModel
            .updateLikedSong(userid,songID,comment)
            .then(function(response){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                });

    };

    function deleteSong(req,res){

        var userID  = req.params.userid;
        var songID = req.params.songid;

        songModel
            .removeLikedSongs(userID,songID)
            .then(function(response){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                });

    };

    function getSongComments(req,res){
        var songID = req.params.songid;

        songModel
            .getSongComments(songID)
            .then(function(response){
                    res.send(response);
                },
                function (err) {
                    res.status(400).send(err);
                });

    }
}