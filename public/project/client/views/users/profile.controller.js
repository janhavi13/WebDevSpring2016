(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("ProfileController",ProfileController);


        function ProfileController($rootScope,$scope,UserService,$location,$routeParams) {


        var vm = this;
        var profileUserId = $routeParams.userid;
        var currentUser= $rootScope.currentUser;

        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;




        vm.edit = false;
        vm.readonly = false;
        vm.self = false;
        vm.followed = false;

        function init() {

            if (!currentUser) {
                $location.url("/login");
            }
            else {
                if (profileUserId == $rootScope.currentUser._id) {

                    vm.self = true;

                    vm.message = null;
                    vm.update = update;
                    vm.firstName = currentUser.firstName;
                    vm.lastName = currentUser.lastName;
                    vm.username = currentUser.username;
                    vm.password = currentUser.password;
                    vm.email = currentUser.emails;
                    vm.phone = currentUser.phones;
                    getSongs(profileUserId);
                    getFollowing(profileUserId);
                    getFollowers(profileUserId);
                }
                else {
                    vm.readonly = true;

                    ifFollowed();
                    UserService
                        .getUserById(profileUserId)
                        .then(function(response) {

                            var currentUser = response.data;
                            if(currentUser !== 'undefined') {
                                vm.firstName = currentUser.firstName === null || currentUser.firstName === 'undefined' ? 'No information found!' : currentUser.firstName;
                                vm.lastName = currentUser.lastName === null || currentUser.firstName === 'undefined' ? 'No information found!' : currentUser.lastName;
                                vm.username = currentUser.username;
                                vm.password = currentUser.password;
                                vm.email = currentUser.emails;
                                vm.phone = currentUser.phones === null  || currentUser.firstName === 'undefined' ? 'No phones Found!' : currentUser.phones;
                            }

                        }, function (err) {
                            console.log(err);
                        });

                    getSongs(profileUserId);
                    getFollowing(profileUserId);
                    getFollowers(profileUserId);
                }
            }
        }

        init();

        function update(username, password, firstName, lastName, email, phones) {
            var newDetails= {"username": username, "firstName": firstName,
                "lastName":lastName , "emails" :email ,"phones" :phones ,"password" :password,
                "roles":currentUser.roles};

            UserService.updateUser(newDetails, currentUser._id)
                .then(
                    function(response) {
                        $rootScope.currentUser = response.data;
                        vm.message="Profile Update";
                    },
                    function(err) {
                        vm.message="Couldn't update the profile";
                    });
        }


        function getSongs(userid) {
            UserService
                .getLikedSongs(userid)
                .then(function(res) {
                    if(res.data.length==0) {
                        vm.songs = null;
                    } else {
                        vm.songs = res.data;
                    }

                });
        }


        function followUser() {

            var loggedinUser = $rootScope.currentUser;
            var profileUserName = vm.username;


            UserService
                .followUser(loggedinUser._id ,loggedinUser.username, profileUserId, profileUserName)
                .then(
                    function(res) {

                        ifFollowed();
                    },function(err) {
                        console.log(err);
                    });
        }

        function unfollowUser() {

            var loggedinUser = $rootScope.currentUser;


            UserService
                .unFollowUser(loggedinUser._id, profileUserId)
                .then(
                    function(res) {

                        ifFollowed();
                    },function(err) {
                        console.log(err);
                    });
        }

        function ifFollowed() {
            var loggedinUser = $rootScope.currentUser;


            UserService
                .checkIfFollowed(loggedinUser._id, profileUserId)
                .then(
                    function(res){

                        if(res.data[0]) {
                            vm.followed = true;
                        } else {
                            vm.followed = false;
                        }

                    }, function(err) {
                        console.log(err);
                    });
        }

        function getFollowing(userid) {
            UserService
                .getFollowing(userid)
                .then(function(res) {


                    if(res.data.length==0) {
                        vm.following = null;
                    } else {
                        vm.following = res.data;
                    }

                });
        }

        function getFollowers(userid) {
            UserService
                .getFollowers(userid)
                .then(function(res){


                    if(res.data.length==0) {
                        vm.followers = null;
                    } else {
                        vm.followers = res.data;
                    }

                });
        }
    }
})();

