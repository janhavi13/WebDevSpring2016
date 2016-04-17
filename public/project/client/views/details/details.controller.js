(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("DetailsController",DetailsController);

    function DetailsController($scope,$routeParams,$http,$rootScope,SongService,UserService,$location){
            var trackID= $routeParams.trackID;
        console.log("TRACK ID ::::" , $routeParams.trackID);
        var vm = this;
      //  vm.likeSong = likeSong;
        //vm.removeLikedSong = removeLikedSong;
        vm.user = $rootScope.currentUser;
        //$http.get("https://api.spotify.com/v1/tracks/"+trackID)
          //  .success(renderDetails);


        vm.liked = null;

        function init() {

            getTrack(trackID);
        }
        init();

        function getTrack(trackID) {
            SongService.findSongByTrackId(trackID, renderDetails);
        }

        function renderDetails(response){
            vm.details=response;
            console.log("Rendering VM details", vm.details);
           // if($rootScope.currentUser) {
              // checkIfLiked();
           // }

            //fetchComments();
        }

        /*     function likeSong(){
            console.log("Liked Song");
            if($rootScope.currentUser){
                //console.log(vm.details);
                UserService.addLikedSong(vm.details,$rootScope.currentUser);
                //checkIfLiked();
            }else {

                $location.url("/login");
            }
        }

        function removeLikedSong(){

            console.log("Liked Song");
            if($rootScope.currentUser){

               // FormService.deleteFormById($rootScope.currentUser._id,vm.details.trackID);
               // checkIfLiked();

            }else {

                $location.url("/login");
            }
        }

       function checkIfLiked(){
            SongService
                .checkIfLiked($rootScope.currentUser._id,vm.details.trackID)
                .then(function(response){
                        console.log(response.data);
                        if(response.data[0]){
                            //console.log("IT was liked");
                            vm.liked = true;
                        }else{
                            //console.log("IT was not liked");
                            vm.liked = null;
                        }
                    },
                    function(err){
                        console.log(err);
                    });

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
*/


    }
})();


