var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load movie schema from movie model
    var SongSchema = require("./songs.schema.server.js")(mongoose);

    // create movie from schema
    var Song  = mongoose.model("Song", SongSchema);

    var songs = [];
    var api = {
        findSongBySongUrl: findSongBySongUrl,
        findSongsBySongUrls: findSongsBySongUrls,
        createSong: createSong,
        userLikesSong: userLikesSong
    };
    return api;

    function userLikesSong (username, song) {

        var deferred = q.defer();

        // find the song by song ID
        Song.findOne({songUrl: song.songUrl},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a movie
                if (doc) {
                    // add user to likes
                    doc.likes.push (username);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no movie
                    // create a new instance
                    var song = new Song({
                        songUrl: song.songUrl,
                        poster: song.Poster,
                        title: song.Title,
                        likes: []
                    });

                    // add user to likes
                    song.likes.push (username);
                    // save new instance
                    song.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findSongsBySongUrls (songUrls) {
        var deferred = q.defer();

        // find all movies
        // whose imdb IDs
        // are in imdbIDs array
        Song.find({
            songUrl: {$in: songUrls}
        }, function (err, songs) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(songs);
            }
        })
        return deferred.promise;
    }

    function createSong(song) {

        // create instance of movie

        var song = new Song({
            songUrl: song.songUrl,
            poster: song.Poster,
            title: song.Title,
            likes: []
        });
        var deferred = q.defer();

        // save movie to database
        song.save(function (err, doc) {

            if (err) {
                // reject promise if error
                defferred.reject(err)
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findSongBySongUrl(songUrl) {

        var deferred = q.defer();

        Song.findOne(songUrl, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
}