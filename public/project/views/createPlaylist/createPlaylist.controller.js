
(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("CreatePlaylist",CreatePlaylist);

    function CreatePlaylist($scope){

        $scope.message=null;
        $scope.createPlaylist=createPlaylist;

        function createPlaylist(playlist){


        }
    }


})();
