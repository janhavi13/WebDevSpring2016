module.exports= function(uuid,db,mongoose,relationModel){

    var SongSchema = require("./songs.schema.server.js")(mongoose);

    var SongModel = mongoose.model('Song',SongSchema);

    var q = require("q");

    var api = {
        addLikedSong:addLikedSong,
        getLikedSongs:getLikedSongs,
        checkIfLiked:checkIfLiked,
        updateLikedSong:updateLikedSong,
        deleteSongUser:deleteSongUser,
        getSongDetails:getSongDetails,
        getSongComments:getSongComments,
        removeLikedSongs: removeLikedSongs
    };

    return api;

    function addLikedSong(songDetails){

        var deferred = q.defer();

        SongModel.create(songDetails,function(err,doc){
            relationModel.create(songDetails,function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(doc);
                }
            })

        });

        //return a promise
        return deferred.promise;
    };

    function getLikedSongs(userId){
        var deferred = q.defer();
        console.log("in GetLikedSongs server");
        relationModel
            .find({userID : userId},
                function(err,doc){
                    deferred.resolve(doc);
                });

        return deferred.promise;
    }

    function removeLikedSongs(userId, songId){

        var deferred = q.defer();
        relationModel.remove({userID: userId , songID: songId},
            function(err,doc){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }



    function checkIfLiked(userId,songId){

        var deferred = q.defer();
        relationModel.find(
            {userID: userId, songID : songId},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                } else{
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    };

    function updateLikedSong(userID,songID,comment){

        var deferred = q.defer();

        var update = {comment: comment};

        relationModel.update({userID:userID, songID:songID},
            {$set : update},
            function(err,doc){
                //console.log(doc);
                if(err){
                    deferred.reject(err);
                }else{
                    //console.log(doc);
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function deleteSongUser(userID,songID){

        var deferred = q.defer();

        relationModel.remove({userID : userID , songID: songID},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    //console.log(doc);
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function getSongDetails(imdbID){
        var deferred = q.defer();

        SongModel.findOne({songID : songID},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function getSongComments(songID){
        var deferred = q.defer();

        relationModel.find({songID:songID},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }
};