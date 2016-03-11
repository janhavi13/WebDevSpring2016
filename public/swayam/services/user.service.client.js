(function(){

    angular
        .module("EventBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope){

        var model = {
          users :[

            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["user"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["user"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["user", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["user"]                }
        ],
            findUserByCredentials : findUserByCredentials,
            setCurrentUser : setCurrentUser,
            updateUser : updateUser,
            createUser:createUser,
            deleteUserById : deleteUserById,
            findAllUsers : findAllUsers,
            getAllUser :getAllUser,
            addNewUser:addNewUser

        };
        return model;

        function setCurrentUser(user){
            $rootScope.currentUser=user;
        }

        function findUserByCredentials(username,password,callback){
              for (var u in model.users ){

                  if(username == model.users[u].username &&
                      password == model.users[u].password)
                     callback(model.users[u]) ;
                  else
                     callback(null);
              }
        }

        function updateUser(id,user,callback){

            for(var u in model.users) {
                if (model.users[u]._id == id) {
                    model.users[u] = user;
                    callback(model.users[u]);
                }
                else{
                    callback(null);
                }
            }
        }

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


        function getAllUser(callback){
            var allUsers=model.users;
            callback(allUsers);
        }

        function addNewUser(newUser){

            var newUser={
                username : newUser.username,
                password : newUser.password
            };
            console.log(newUser);
            model.users.push(newUser);
         //   callback(newUser);
        }

    }
})();


