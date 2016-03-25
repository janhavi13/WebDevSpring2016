(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("DetailsController",DetailsController);

    function DetailsController($scope,$routeParams,$http){
            var trackID= $routeParams.trackID;

        $http.get("https://api.spotify.com/v1/tracks/"+trackID)
            .success(renderDetails);

        function renderDetails(response){
            $scope.details=response;
        }

        function likeSong(name){

            if($rootScope.user){
                //console.log(imdbID + poster + title);
                UserService.addSongLike(name,$rootScope.user._id);

            }else {

                $location.url("/login");
            }
        }



    }
})();


