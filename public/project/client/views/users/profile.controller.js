(function(){
    "use strict";
    angular.module("MusicApp")
        .controller("ProfileController",ProfileController);


    function ProfileController(UserService,$rootScope){

        var currentUser= $rootScope.currentUser;
        var vm=this;
        vm.message= null;
        vm.firstName=currentUser.firstName;
        vm.lastName=currentUser.lastName;
        vm.username=currentUser.username;
        vm.password=currentUser.password;
        vm.email=currentUser.emails;
        vm.phones=currentUser.phones;
        vm.update=update;

        console.log( "user...emailname", vm.email);
        function init(){

        }
        init;

        function update(username,password,firstName,lastName,email,phones){
            var newDetails= {"username" : username, "firstName": firstName,
                "lastName":lastName , "emails" :email ,"phones" :phones ,"password" :password,
                "roles":currentUser.roles};

            console.log("the deatails from view",newDetails);
            UserService.updateUser(newDetails,currentUser._id)
                .then(
                    function(response){
                        $rootScope.currentUser=response.data;
                        vm.message="Profile Update";
                    },
                    function(err){
                        vm.message="Couldn't update the profile";
                    });
        }
    }
})();

