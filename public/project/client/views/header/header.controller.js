(function(){
    angular.module("MusicApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($location, $scope, UserService, $rootScope){
      //  $scope.logout=logout;


        var vm=this;
        vm.logout=logout;
        $scope.visitProfile = visitProfile;


        function logout() {


            UserService.logout()
                .then(function () {
                        $rootScope.currentUser = null;
                        $location.url('/home');
                    },
                    function (err) {
                        console.log(err);
                    });
        }

        function visitProfile(){


            $location.url("/profile/" + $rootScope.currentUser._id)
        }
    }


})();

