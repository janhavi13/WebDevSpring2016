(function() {
    "use strict";
    angular
        .module("MusicApp", ["ngRoute"])
        .filter('trusted', ['$sce', function ($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        }]);
})();

