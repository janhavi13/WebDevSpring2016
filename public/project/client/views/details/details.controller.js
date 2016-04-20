(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("DetailsController",DetailsController);

    function DetailsController($routeParams, $rootScope, SongService, UserService, $location){

        var trackID = $routeParams.trackID;

        var vm = this;
        vm.likeSong = likeSong;
        vm.removeLikedSong = removeLikedSong;
        vm.user = $rootScope.currentUser;

        vm.updateComment = updateComment;

        vm.user = $rootScope.currentUser;
        var songid = $routeParams.songID;
        vm.isNewComment = true;
        vm.commentFlag = false;




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

            fetchComments();
        }

        function likeSong() {

                if($rootScope.currentUser){
                    UserService.addLikedSong(vm.details,$rootScope.currentUser);
                    checkIfLiked();
                } else {
                    $location.url("/login");
                }
        }

        function removeLikedSong(){


            if($rootScope.currentUser){

                SongService.removeLikedSongs($rootScope.currentUser._id, vm.details.id);
                checkIfLiked();

            }else {

                $location.url("/login");
            }
        }

       function checkIfLiked() {

            SongService
                .checkIfLiked($rootScope.currentUser._id, vm.details.id)
                .then(function(response) {

                    if(response.data[0]) {

                        vm.liked = true;
                    } else {

                        vm.liked = null;
                    }
                },
                function(err) {

                });


        }

        function fetchComments(){
            SongService
                .fetchComments(vm.details.id)
                .then(function(response){

                        if(response.data.length!=0){
                            vm.comments = response.data;
                            if(vm.user) {

                                response.data.forEach(function(comment){

                                    if(comment.userID == vm.user._id){
                                        vm.userComment = comment.comment;
                                        vm.isNewComment = false;
                                    }
                                });
                            }
                        }else {
                            vm.comments = null;
                        }

                    },
                    function(err){

                    });
        }

        function updateComment() {


            if(vm.isNewComment){

                likeSong();
            }

            SongService.updateSongById($rootScope.currentUser._id,vm.details.id,vm.userComment);

            vm.commentFlag = false;

            init();
        }
    }
})();


