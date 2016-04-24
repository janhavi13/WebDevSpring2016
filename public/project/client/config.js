(function() {
    "use strict";
    angular.module("MusicApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller:"HomeController",
                controllerAs:"model",
                resolve :{
                    loggedin:checkCurrentUser
                }
            })

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller:"AdminController",
                controllerAs:"model",
                resolve :{
                    loggedin:checkAdmin
                }
            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller:"LoginController",
                controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs: "model",
                resolve :{
                    loggedin:checkLoggedin
                }
            })

            .when("/profile/:userid",{
                templateUrl:"views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve :{
                    loggedin:checkLoggedin
                }

            })

            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller:"SearchController",
                controllerAs:"model",
                resolve :{
                    loggedin:checkCurrentUser
                }
            })

            .when("/search/:trackId", {
                templateUrl: "views/search/search.view.html",
                controller:"SearchController",
                resolve:{
                    loggedin:checkCurrentUser
                }
            })


            .when("/myPlaylists",{
                templateUrl:"views/users/myPlaylists.view.html",
                controller:"MyPlaylists"
            })

            .when("/details/:trackID",{
                templateUrl:"views/details/details.view.html",
                controller:"DetailsController",
                controllerAs: "model",
                resolve :{
                    loggedin:checkCurrentUser
                }
            })


            .when("/username", {
                templateUrl: "views/users/profile.view.html",
                resolve :{
                    loggedin:checkLoggedin
                }
            })

            .when("/documentation",{
                templateUrl:"views/documentation/documentation.view.html",

            })

            .otherwise({
                redirectTo: "/home"
            })
    }


    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;

            if (user !== '0')
            {
                // User is Authenticated
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            else
            {
                // User is Not Authenticated
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });



        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();

//==============
/*(function() {
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
                controller:"RegisterController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller:"LoginController",
                controllerAs:"model"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs: "model"
            })


            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller:"SearchController",
                controllerAs:"model"
            })

            .when("/search/:trackId", {
                templateUrl: "views/search/search.view.html",
                controller:"SearchController"
            })


            .when("/myPlaylists",{
                templateUrl:"views/users/myPlaylists.view.html",
                controller:"MyPlaylists"
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


    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }

})();*/