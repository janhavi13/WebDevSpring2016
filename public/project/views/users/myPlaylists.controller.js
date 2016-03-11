
(function(){
    "use strict";
    angular
        .module("MusicApp")
        .controller("MyPlaylists",MyPlaylists);

    function MyPlaylists($rootScope,$location,UserPlaylist,$scope){

        var currentUserPlaylists=[];
        var playlistIndexSelected;

        $scope.deletePlaylist=deletePlaylist;
        $scope.selectPlaylist=selectPlaylist;
        $scope.updatePlaylist=updatePlaylist;
        $scope.alertMessage=null;

        if($rootScope.currentUser==null){
            $location.url("/home");
        }
        else{
        var currentUser=$rootScope.currentUser;
         UserEvent.findEventsFoCurrentUser(currentUser._id,renderPlaylists);
        }

        function renderPlaylists(userPlaylists){
            $scope.playlists=userPlaylists;
            currentUserPlaylists=userPlaylists;
        }

        function deletePlaylist(index){
            playlistIndexSelected=index;
            UserPlaylist.deletePlaylistById(currentUserPlaylists[index]._id,renderPlaylistsAfterAction);
        }

        function renderPlaylistsAfterAction(UserPlaylists){
            UserPlaylist.findPlaylistsFoCurrentUser(currentUser._id,renderPlaylists);
        }

        function selectPlaylist(index){
            playlistIndexSelected = index;
            $scope.playlistSelected=
            {"_id": currentUserPlaylists[index]._id,
                "pName": currentUserPlaylists[index].pName,
                "cDate": currentUserPlaylists[index].cDate,
                "userId": currentUserPlaylists[index].userId
            };
        }

        function updatePlaylist(pSelected){
         //   if(pSelected.pname == null || pSelected.cDate == null ){
            if(pSelected.pName == null){
                $scope.alertMessage="Enter details of all the required fields";
            }
            else{
                currentUserPlaylists[playlistIndexSelected].pName=pSelected.pName;
                currentUserPlaylists[playlistIndexSelected].cDate=pSelected.cDate;
                $scope.playlistSelected = null;
            }
        }
    }
})();