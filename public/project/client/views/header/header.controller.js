/*(function(){
    angular.module("MusicApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,UserService){
        $scope.logout=logout;

        function logout(){
            UserService.setCurrentUser(null);
        }
    }
})();*/

(function(){
    angular.module("MusicApp")
        .controller("HeaderController",HeaderController);

    function HeaderController(UserService,$rootScope,$location){
        var vm=this;
        vm.logout=logout;

        function init(){

        }
        init();

        function logout() {

            console.log("entered header controller");
            UserService.logout()
                .then(function () {
                        $rootScope.currentUser = null;
                        $location.url('/home');
                    },
                    function (err) {
                        console.log(err);
                    });
        }
    }
})();

