(function(){
    angular
        .module("MusicApp")
        .factory("SongService", SongService);

    function SongService($http) {
        var api = {
            userLikesSong: userLikesSong,
            findUserLikes: findUserLikes
        };
        return api;

        function findUserLikes (song) {
            return $http.get("/api/project/song/"+song+"/user");
        }

        function userLikesSong(id, songID) {
            return $http.post("/api/project/user/"+id+"/song/"+songID);
        }
    }
})();