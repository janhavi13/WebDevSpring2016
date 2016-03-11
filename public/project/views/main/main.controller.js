(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("MainController",MainController);

    function MainController($scope, $location)
    {
        $scope.$location = $location;
    }
})();