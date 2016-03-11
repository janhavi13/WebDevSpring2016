
(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$location,$http,$routeParams){

        var SEARCH_URL="https://api.spotify.com/v1/search?q=TRACK&type=track&limit=10";

        var trackId = $routeParams.trackId;
        console.log($scope.track);
        $scope.trackToSearch = $scope.track;
        console.log($scope.trackToSearch);
        $location.url("/search");
        $scope.searchTrack=searchTrack;


        if(trackId){
            searchTrack(track);
        }

        function searchTrack(track) {
            $scope.trackToSearch=track;

            var url = SEARCH_URL.replace("TRACK", track);


            $http.get(url).success(renderSearchResult);
        }

        function renderSearchResult(response){
            console.log(response);
            $scope.searchResult=response;
        }

    }
})();