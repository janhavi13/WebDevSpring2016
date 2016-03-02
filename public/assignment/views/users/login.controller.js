/**
 * Created by janhavi on 3/1/16.
 */
(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, UserService,$rootScope,$location) {
        $scope.login = login;
        $scope.message = null;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password,render);

            function render(user) {
                if(user){

                    $rootScope.currentUser = user;
                    $location.url("/profile");
                } else {
                    $scope.message = "Username not found!";
                }
            }
        }
    }
})();
