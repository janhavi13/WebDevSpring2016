(function(){
    "use strict";
    angular
        .module("MusicApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService,$location,$rootScope) {
        var vm = this;
        vm.login = login;
        vm.message = null;

        function init() {
        }

        init();

        function login(user) {
            if(!user){
                vm.message = "Please enter login details";
                return;
            }
            UserService.login(user)
                .then(function(response) {
                    console.log(response);
                    $rootScope.currentUser = response.data;
                    $location.url("/profile/" + response.data._id);
                    },
                    function(err){
                        vm.message = "username or password not found";
                    }
                );
        }
    }
})();

