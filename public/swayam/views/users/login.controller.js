(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,UserService,$rootScope){
        $scope.login = login;
        $scope.message=null;

        function login(user)
        {
            // need to include the callback parameter
            UserService.findUserByCredentials(user.username,user.password,render);

            function render(user){
               if(user){
                   UserService.setCurrentUser(user);
                   $location.url("/profile");
               }
                else{
                   $scope.message="Username and password doesnot match";
               }
            }
        }
    }
})();

