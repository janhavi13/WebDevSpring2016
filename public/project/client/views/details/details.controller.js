(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("DetailsController",DetailsController);

    function DetailsController($scope,$routeParams,$rootScope,SongService,  $location,$http){
            var trackID= $routeParams.trackID;
        var vm = this;
        var songID = $routeParams.trackID;
        var currentUser = $rootScope.currentUser;
       vm.favorite = favorite;

        $http.get("https://api.spotify.com/v1/tracks/"+trackID)
            .success(renderDetails);

        function init() {

           /* SpotifyService
                .findSongBytrackID (trackID)
                .then(function(response){
                    vm.data = response.data;
                });

            SongService
                .findUserLikes (songID)
                .then(function(response){
                    vm.song = response.data;
                });*/
        }




        init();

        function renderDetails(response){
            console.log("&&&");
            $scope.details=response;
        }


            function favorite(songID) {
                if(currentUser) {
                    vm.song.likes = [];
                    vm.song.likes.push(currentUser._id);
                    SongService
                        .userLikesSong(currentUser._id, songID);
                } else {
                    $location.url("/login");
                }
            }




    }
})();


