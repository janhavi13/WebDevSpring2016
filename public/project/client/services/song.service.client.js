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

        function userLikesSong(username, song) {
            return $http.post("/api/project/user/"+username+"/song/"+song);
        }
    }
})();