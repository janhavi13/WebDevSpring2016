
(function (){
    angular.module("MusicApp")
        .factory("UserPlaylist",UserPlaylist);

    function UserPlaylist(){

        var playlists=[
            {"_id": "000", "pName": "Jazz", "userId": 123},
            {"_id": "010", "pName": "Romantic",  "userId": 123},
            {"_id": "020", "pName": "SoulMusic","userId": 234},
        ];

        var model = {
            findPlaylistForCurrentUser : findPlaylistForCurrentUser,
            deletePlaylistById : deletePlaylistById,
            updatePlaylistById :updatePlaylistById

        }
        return model;


        function findPlaylistForCurrentUser(currentUserId,callback){
            var userPlaylists=[];
            for(p in playlists){
                if(playlists[p].userId==currentUserId){
                    userPlaylists.push(playlists[p]);
                }
            }
            callback(userPlaylists);
        }

        function deletePlaylistById(playlistId,callback){
            for(p in playlists){
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


                }
            }
            callback(forms[p]);

        }



        function createNewPlaylist(newPlaylist,callback){

            var Playlist= { "_id": "000",
                "pName": newPlaylist.Name,
                "desc":newPlaylist.desc
            }

            console.log(Playlist);
            console.log(playlists);
            playlists.push(Playlist);
            callback();
        }

    }
})();
