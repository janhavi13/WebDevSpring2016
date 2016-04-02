(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController",ProfileController);


    function ProfileController(UserService,$rootScope){

        var currentUser= $rootScope.currentUser;
        var vm=this;
        vm.message= null;
        vm.update=update;

        vm.firstName=currentUser.firstName;
        vm.lastName=currentUser.lastName;
        vm.username=currentUser.username;
        vm.password=currentUser.password;
        vm.email=currentUser.email;

        function init(){

        }
        init;

        function update(username,password,firstName,lastName,email){
            var newDetails= {"username" : username, "firstName": firstName,
                "lastName":lastName , "email" :email ,"password" :password};

            UserService.updateUser(newDetails,currentUser._id)
                .then(
                    function(response){
                            UserService.setCurrentUser(response.data);
                            vm.message="Profile Update";
                        },
                    function(err){

                            vm.message="Couldn't update the profile";
                        });
        }
    }
})();


