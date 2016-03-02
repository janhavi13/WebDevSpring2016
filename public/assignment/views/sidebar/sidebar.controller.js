/**
 * Created by janhavi on 2/20/16.
 */
(function()
{
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope, $location) {
        $scope.$location = $location;
    }
})();