(function(){

    angular
        .module("FormBuilderApp")
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
            addNewUserByAdmin:addNewUserByAdmin
        };
        return model;

        function setCurrentUser(user){
            $rootScope.currentUser=user;
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function findUserByCredentials(credentials){
            return $http.get("/api/assignment/user/"+credentials.username+"/"+credentials.password);
        }

        function register(user){
            return $http.post("/api/assignment/register", user);
        }

        function updateUser(user,currentUserId){
            return $http.put("/api/assignment/updateUser/"+currentUserId,user);
        }

        function deleteUser(user){
            return $http.delete("/api/assignment/deleteUser/"+user);
        }

        function getAllUsers(){
            return $http.get("/api/assignment/getAllUsers");
        }

        function getUserByUserName(username){
            return $http.get("/api/assignment/getUserByUserName/"+username);
        }

        function getUserById(id){
            return $http.get("/api/assignment/getUserById/"+id);
        }

        function login(user) {
            return $http.post("/api/assignment/login",user);}

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function addNewUserByAdmin(user){
            return $http.post("/api/assignment/addNewUser",user);
        }
    }
})();


