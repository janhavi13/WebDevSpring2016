
(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("SideBarController",SideBarController);

    function SideBarController($scope,$location){
        $scope.$location=$location;

    }
})();

