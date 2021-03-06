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
            getLikedSongs:getLikedSongs,
            followUser:followUser,
            unFollowUser:unFollowUser,
            checkIfFollowed:checkIfFollowed,
            getFollowing:getFollowing,
            getFollowers:getFollowers
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

        function updateUser(user, currentUserId) {
            return $http.put("/api/project/updateUser/" + currentUserId, user);
        }

        function deleteUser(user){
            return $http.delete("/api/project/deleteUser/"+user);
        }

        function getAllUsers(){

            return $http.get("/api/project/getAllUsers");
        }

        function getUserByUserName(username){
            return $http.get("/api/project/getUserByUserName/"+username);
        }

        function getUserById(id){
            return $http.get("/api/project/getUserById/" + id);
        }

        function login(user) {

            return $http.post("/api/project/login",user);
        }

        function logout() {

            return $http.post("/api/project/logout");
        }

        function addNewUserByAdmin(user){
            return $http.post("/api/project/addNewUser",user);
        }


        function addLikedSong(songDetails,userDetails){



            var songLike = {
                "songID":songDetails.id,
                "title":songDetails.name,
                "poster":songDetails.poster,
                "userID":userDetails._id,
                "username":userDetails.username,
                "comment":"",
                "created": (new Date()).getTime()
            };

            var liked = $http.post("/api/project/addlikedsong",songLike);

            return liked;
        }


        function getLikedSongs(userID){

            return $http.get("/api/project/getlikedsongs/" + userID);

        }

        function followUser(userID, username, followUserID, followUsername) {
            var follow = {"follower_userid": userID,
                "follower_username": username,
                "following_userid": followUserID,
                "following_username": followUsername
            };

            return $http.post("/api/project/addfollowing",follow);
        }

        function unFollowUser(userID,follow_userID) {

            return $http.delete("/api/project/removefollowing/"+userID+"/"+follow_userID);
        }

        function checkIfFollowed(userId,followingId) {

            return $http.get("/api/project/following/" + userId + "/" + followingId);
        }

        function getFollowing(userID) {
            return $http.get("/api/project/getfollowing/"+userID);
        }

        function getFollowers(userID) {
            return $http.get("/api/project/getfollowers/"+userID);
        }
    }
})();


