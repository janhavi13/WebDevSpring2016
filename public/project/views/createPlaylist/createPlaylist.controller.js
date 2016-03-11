
(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("CreateEvent",CreateEvent);

    function CreateEvent($scope){

        $scope.message=null;
        $scope.createEvent=createEvent;

        function createEvent(event){


        }
    }


})();
