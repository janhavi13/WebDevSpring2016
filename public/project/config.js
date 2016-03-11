
(function() {
    "use strict";
    angular.module("MusicApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller:"LoginController"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController"
            })

            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller:"SearchController"
            })

            .when("/search/:trackId", {
                templateUrl: "views/search/search.view.html",
                controller:"SearchController"
            })

            .when("/createEvent", {
                templateUrl: "views/createEvent/createPlaylist.view.html",
                controller:"CreateEvent"
            })

            .when("/details/:trackID",{
                templateUrl:"views/details/details.view.html",
                controller:"DetailsController"
            })


            .when("/admin",{
                templateUrl:"views/admin/admin.view.html",
                controller:"AdminController"
            })

            .otherwise({
                redirectTo: "/home"
            })
    }
})();