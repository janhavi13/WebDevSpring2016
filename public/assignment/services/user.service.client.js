/**
 * Created by janhavi on 2/20/16.
 */

(function()
{
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);






    function UserService() {

       var model =
           {users: [
            {
                "id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ],

               findUserByCredentials: findUserByCredentials,
               findAllUsers: findAllUsers,
               createUser: createUser,
               deleteUserById: deleteUserById,
               updateUser:updateUser,
               setCurrentUser:setCurrentUser


           };

        return model;


        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }


        function findUserByCredentials(username, password, callback) {

            var flag = "false";

            for(var u in model.users) {
                if(model.users[u].username === username &&
                    model.users[u].password === password) {
                    flag = "true";
                    callback(model.users[u]);
                }
            }
            if(flag === "false") {
                callback(null);
            }
        }




        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            var user = {
                username: user.username,
                password:user.password,
                _id:(new Date).getTime(),
                email:user.email
            };
            model.users.push(user);
            callback(user);
            console.log(user);
        }

        function deleteUserById(userId, callback) {
            for(var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users.splice(u, 1);
                }
            }
            callback(model.users);
        }


        function updateUser(userId, user, callback) {
            var flag ="false";
            for(var u in model.users) {
                if (model.users[u]._id === userId) {
                    flag = "true";
                    model.users[u] = user;
                    callback(model.users[u]);
                }
            }
            if(flag = "false") {
                callback(null);
            }
            console.log(user);
        }


    }
})();



