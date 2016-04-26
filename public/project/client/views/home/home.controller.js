(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, $location, $http, $routeParams, $anchorScroll) {
        var vm = this;
        var SEARCH_GLOBAL_URL="https://api.spotify.com/v1/tracks?ids=11hqMWwX7sF3sOGdtijofF,7HzCxalzzYQOFb9a7Xs3j6,32lmL4vQAAotg6MrJnhlQZ,5kqIPrATaCc2LqxVWzQGbk,275a9yzwGB6ncAW4SxY7q3,27SdWb2rFzO6GWiYDBTD9j,1i1fxkWeaMmKEB4T7zqbzK,1brwdYwjltrJo7WHpIvbYt,40YcuQysJ0KlGQTeGUosTC";
        var SEARCH_URL="https://api.spotify.com/v1/search?q=TRACK&type=track&limit=10";
        var SEARCH_USA_URL="https://api.spotify.com/v1/tracks?ids=11hqMWwX7sF3sOGdtijofF,50kpGaPAhYJ3sGmk6vplg0,09CtPGIpYB4BrO8qb1RGsF,27GmP9AWRs744SzKcpJsTZ,2mCF8L0brIs88eH6Kf2h9p,17Q87zeXgsAi9iQQbMu9v0,0r4SsYcwvd8URat6AS2m6f,0T3ruvJQNQeTyK7tWKvdoX,42ftjU4cTN5UTRksyqBKZJ";
        var SEARCH_MAROON_URL= "https://api.spotify.com/v1/tracks?ids=2iuZJX9X9P0GKaE93xcPjk,7sapKrjDij2fpDVj0GxP66,4gbVRS8gloEluzf0GzDOFc,2bL2gyO6kBdLkNSkxXNh6x,7LcfRTgAVTs5pQGEQgUEzN";
        var trackId = $routeParams.trackId;

        if(trackId){
            searchTrack(trackId);
        }


        function searchGlobalTrack() {
            // $scope.trackToSearch=track;

            var url = SEARCH_GLOBAL_URL;

            $http.get(url).success(renderSearchResult);
        }

        vm.searchTrack = searchTrack;
        vm.searchGlobalTrack = searchGlobalTrack;
        vm.searchUSATrack = searchUSATrack;
        vm.searchMaroonTrack = searchMaroonTrack;
        vm.scrollTo = scrollTo;

        function init(){

        }
        init();

        function searchTrack(track) {
            // $scope.trackToSearch=track;

            var url = SEARCH_URL.replace("TRACK", track);


            $http.get(url).success(renderSearchResult);
        }

        function renderSearchResult(response){

            vm.searchResult=response;
            console.log(response);
            vm.tracks = response;
            console.log(vm);
        }
        function searchUSATrack() {
            // $scope.trackToSearch=track;

            var url = SEARCH_USA_URL;

            $http.get(url).success(renderSearchResult);
        }

        function searchMaroonTrack() {
            // $scope.trackToSearch=track;

            var url = SEARCH_MAROON_URL;

            $http.get(url).success(renderSearchResult);
        }
    }
})();