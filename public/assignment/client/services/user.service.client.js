(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope,$http){

        var model = {
          users :[

            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ],
            findUserByCredentials : findUserByCredentials,
            setCurrentUser : setCurrentUser,
            updateUser : updateUser,
            createUser:createUser,
            deleteUserById : deleteUserById,
            findAllUsers : findAllUsers,
            login:login,
            register: register
        };
        return model;

        function setCurrentUser(user){
            $rootScope.currentUser=user;
        }

        function findUserByCredentials(username,password,callback){
             /* for (var u in model.users ){

                  if(username == model.users[u].username &&
                      password == model.users[u].password)
                     callback(model.users[u]) ;
                  else
                     callback(null);


              }*/
             callback($http.post("/api/project/user"));
        }

      /*  function updateUser(id,user,callback){

            for(var u in model.users) {
                if (model.users[u]._id == id) {
                    model.users[u] = user;
                    callback(model.users[u]);
                }
                else{
                    callback(null);
                }
            }
        }*/

        function createUser(user,callback){

            var user ={
             username: user.username,
             password:user.password,
             _id:(new Date).getTime(),
             email:user.email
         };
            model.users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback){
            for(var u in model.users) {
                if (model.users[u]._id == userId) {
                    model.users.splice(u, 1);
                }
            }
            callback(model.users);
        }

        function findAllUsers(callback){
            callback(users);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function deleteUserById(userId, callback) {
            for(var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users.splice(u, 1);
                }
            }
            callback(model.users);
        }

        function login(credentials){
            return $http.post("/api/assignment/formMaker/login",credentials);
        }

        function register(user){
            return $http.post("/api/assignment/formMaker/register", user);
        }

        function updateUser(user){
            return $http.post("/api/assignment/formMaker/updateUser/"+user._id,user);
        }




    }
})();


