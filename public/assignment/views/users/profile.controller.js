/**
 * Created by janhavi on 3/1/16.
 */
(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService,$rootScope) {
        var currentUser = $rootScope.currentUser
        $scope.update = update;
        $scope.username = currentUser.username;
        $scope.password = currentUser.password;
        $scope.firstName = currentUser.firstName;
        $scope.lastName = currentUser.lastName;
        $scope.email = currentUser.email;

        function update(username,password,firstName,lastName,email) {
            $scope.message = null;
            var id = currentUser._id;
            var user ={
                "_id":id,
                "username":username,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                "roles":currentUser.roles
            }

            UserService.updateUser(id,user,render);

            function render(user){
                if (user) {

                    //UserService.setCurrentUser(user);
                    $rootScope.currentUser = user;
                    $scope.message = "Profile Updated";
                }
            }
        }
    }
})();