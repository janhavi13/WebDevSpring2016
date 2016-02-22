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

       var users= [
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
        ]


        function findUserByCredentials(username, password, callback) {

           // if(username == users.username && password == users.password)

        }



        function findAllUsers(callback) {
        }

        function createUser(user, callback) {
        }

        function deleteUserById(userId, callback) {
        }


        function updateUser(userId, user, callback) {
        }


    }
})();



