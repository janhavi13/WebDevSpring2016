(function(){
    angular
        .module("MusicApp")
        .factory("SpotifyService", spotifyService);

    function spotifyService($http) {
        var api = {
            searchSongByTitle: searchSongByTitle,
            findSongBySongID: findSongBySongID
        };
        return api;

        function findSongBySongID(trackID) {
            // use JSONP since API does not support CORS
            return $http.jsonp("http://www.omdbapi.com/?i="+songID+"&callback=JSON_CALLBACK");

        }

        function searchSongByTitle(trackID) {
            // use JSONP since API does not support CORS
           // return $http.jsonp("http://www.omdbapi.com/?s="+title+"&callback=JSON_CALLBACK");
            $http.get("https://api.spotify.com/v1/tracks/"+trackID);

        }
    }
})();