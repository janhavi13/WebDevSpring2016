(function(){

    angular
        .module("MusicApp")
        .factory("UserService",UserService);

    function UserService($rootScope,$http){

        var model = {

            setCurrentUser : setCurrentUser,
            updateUser : updateUser,
            findAllUsers : findAllUsers,
            findUserByCredentials:findUserByCredentials,
            register: register,
            getAllUsers:getAllUsers,
            getUserById:getUserById,
            deleteUser:deleteUser,
            login:login,
            logout:logout,
            addNewUserByAdmin:addNewUserByAdmin,
            addLikedSong:addLikedSong,
            getLikedSong:getLikedSong
        };
        return model;

        function setCurrentUser(user){
            $rootScope.currentUser=user;
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function findUserByCredentials(credentials){
            return $http.get("/api/project/user/"+credentials.username+"/"+credentials.password);
        }

        function register(user){
            return $http.post("/api/project/register", user);
        }

        function updateUser(user,currentUserId){
            return $http.put("/api/project/updateUser/"+currentUserId,user);
        }

        function deleteUser(user){
            return $http.delete("/api/project/deleteUser/"+user);
        }

        function getAllUsers(){
            console.log("getAllUsers");
            return $http.get("/api/project/getAllUsers");
        }

        function getUserByUserName(username){
            return $http.get("/api/project/getUserByUserName/"+username);
        }

        function getUserById(id){
            return $http.get("/api/project/getUserById/"+id);
        }

        function login(user) {
            return $http.post("/api/project/login",user);}

        function logout() {
            console.log("entered logout controller");
            return $http.post("/api/project/logout");
        }

        function addNewUserByAdmin(user){
            return $http.post("/api/project/addNewUser",user);
        }


        function addLikedSong(songDetails,userDetails){

            console.log(songDetails);
            console.log(userDetails);

            var songLike = {
                "songID":songDetails.songID,
                "title":songDetails.title,
                "poster":songDetails.poster,
                "userID":userDetails._id,
                "username":userDetails.username,
                "comment":"",
                "created": (new Date()).getTime()
            };

            return $http.post("/api/project/addlikedsong",songLike);
        };


        function getLikedSong(userID){

            return $http.get("/api/project/getlikedsong/"+userID);

        };
    }
})();


