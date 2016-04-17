(function(){
    angular
        .module("MusicApp")
        .factory("SongService", SongService);

    function SongService($http) {
        var api = {
            findSongByTrackId:findSongByTrackId,
            checkIfLiked:checkIfLiked,
            fetchComments:fetchComments,
            removeLikedSongs: removeLikedSongs
        };
        return api;

        function removeLikedSongs(userId, songId) {
            $http.delete("/api/project/removelikedsongs/" + userId + "/" + songId);
        }


        function findSongByTrackId(trackID, callback) {
            console.log("TrackID", trackID);
            $http.get("https://api.spotify.com/v1/tracks/"+trackID)
                .success(callback);
        }

        function checkIfLiked(id,songID){
            return $http.get("/api/project/checklike/"+id+"/"+songID);
        };

        function fetchComments(songID){
            return $http.get("/api/project/comments/"+songID);
        };



    }
})();