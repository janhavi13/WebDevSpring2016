(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("CreatePlaylist",CreatePlaylist);

    function CreatePlaylist($scope,UserPlaylist){

        $scope.message=null;
        $scope.createPlaylist=createPlaylist;

        function CreatePlaylist(playlist){

            if(playlist==null){
                $scope.message = "Not a valid entry";
                return;
            }

            if(playlist.Name == null){
                $scope.message ="Enter a playlist name";
                return;
            }

            console.log(playlist);


            if(playlist.desc == null){
                $scope.message = "Enter a playlist description";
                return;
            }

            UserPlaylist.createNewPlaylist(playlist,render);

            function render(){
                $scope.message = "Your playlist is created";
                $scope.playlist=null;

            }
        }
    }
})();
