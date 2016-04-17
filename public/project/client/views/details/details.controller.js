(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("DetailsController",DetailsController);

    function DetailsController($routeParams, $rootScope, SongService, UserService, $location){

        var trackID = $routeParams.trackID;
        console.log("TRACK ID ::::" , $routeParams.trackID);
        var vm = this;
        vm.likeSong = likeSong;
        vm.removeLikedSong = removeLikedSong;
        vm.user = $rootScope.currentUser;

        function init() {

            getTrack(trackID);
        }
        init();

        function getTrack(trackID) {
            SongService.findSongByTrackId(trackID, renderDetails);
        }

        function renderDetails(response) {
            vm.details=response;
            if($rootScope.currentUser) {
                checkIfLiked();
            }

            //fetchComments();
        }

        function likeSong() {
            console.log("Liked Song");
                if($rootScope.currentUser){
                    UserService.addLikedSong(vm.details,$rootScope.currentUser);
                    checkIfLiked();
                } else {
                    $location.url("/login");
                }
        }

        function removeLikedSong(){

            console.log("Liked Song");
            if($rootScope.currentUser){

                SongService.removeLikedSongs($rootScope.currentUser._id, vm.details.id);
                checkIfLiked();

            }else {

                $location.url("/login");
            }
        }

       function checkIfLiked() {
           console.log(vm);
            SongService
                .checkIfLiked($rootScope.currentUser._id, vm.details.id)
                .then(function(response) {
                    console.log("Response in checkIfLiked: ", response.data);
                    if(response.data[0]) {
                        //console.log("IT was liked");
                        vm.liked = true;
                    } else {
                        console.log("IT was not liked");
                        vm.liked = null;
                    }
                },
                function(err) {
                    console.log(err);
                });

           console.log(vm);
        }

        function fetchComments(){
            SongService
                .fetchComments(vm.details.trackID)
                .then(function(response){
                        console.log(response);
                        vm.comments = response.data;
                    },
                    function(err){
                        console.log(err);
                    });
        }
    }
})();


