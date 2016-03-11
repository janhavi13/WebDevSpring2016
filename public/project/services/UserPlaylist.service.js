
(function (){
    angular.module("MusicApp")
        .factory("UserPlaylist",UserPlaylist);

    function UserPlaylist(){

        var playlists=[
            {"_id": "000", "pName": "Jazz","cDate": "2013-05-23", "userId": 123},
            {"_id": "010", "pName": "Romantic", "cDate": "11/10/2016", "userId": 123},
            {"_id": "020", "pName": "SoulMusic","cDate": "11/11/2016","userId": 234},
        ];

        var model = {
            findPlaylistForCurrentUser : findPlaylistForCurrentUser,
            deletePlaylistById : deletePlaylistById,
            updatePlaylistById :updatePlaylistById

        }
        return model;


        function findPlaylistForCurrentUser(currentUserId,callback){
            var userPlalists=[];
            for(p in playlists){
                if(playlists[p].userId==currentUserId){
                    userPlaylists.push(playlists[p]);
                }
            }
            callback(userPlaylists);
        }

        function deletePlaylistById(playlistId,callback){
            for(e in playlists){
                if(playlists[p]._id==playlistId){
                    playlists.splice(p, 1);
                    break;
                }
            }
            callback(playlists);

        }

        function updatePlaylistById(playlistId, playlist, callback){
            for(p in playlists){
                if(playlists[p]._id==playlistId){
                    playlists[p].pName=playlist.pName;
                    playlists[p].sDate=playlist.cDate;

                }
            }
            callback(forms[p]);

        }

    }
})();