(function(){
    angular.module("MusicApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($location, $scope, UserService, $rootScope){
        $scope.logout=logout;
        $scope.visitProfile = visitProfile;


        function logout(){
            UserService.setCurrentUser(null);
        }

        function visitProfile(){
            console.log("visitProfile");
            console.log($rootScope);
            $location.url("/profile/" + $rootScope.currentUser._id)
        }
    }


})();

