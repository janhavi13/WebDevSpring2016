module.exports = function(app, songModel, userModel) {
    app.post("/api/project/user/:userId/song/:songUrl", userLikesSong);
    app.get("/api/project/song/:songID/user", findUserLikes);

    function findUserLikes (req, res) {
        var songID = req.params.songID;

        var song = null;
        songModel
            .findSongBySongID(songID)
            .then (
                function (doc) {
                    song = doc;
                    if (doc) {
                        return userModel.findUsersByIds(song.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (users) {
                    song.userLikes = users;
                    res.json(song);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userLikesSong(req, res) {
       // var songSpotify  = req.body;
        var userId = req.params.userId;
        var songUrl = req.params.songUrl;
        var song;

        songModel
            .userLikesSong(username, songUrl)
            .then(
                function (song) {
                    return userModel.userLikesSong(username, songUrl);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}