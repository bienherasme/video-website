(function () {
    angular.module('crossapp')
        .controller('LoginController', function ($scope, $state,AuthService, $localStorage, toastr, $rootScope, $stateParams,md5) {
            var self = this;

            self.login = login;

            function login() {
                AuthService.login({username:self.user.username, password:md5.createHash(self.user.password)})
                    .then(function (authinfo) {
                      let auth = authinfo;
                        //validate if loggedin was correct
                        if(auth.data.sessionId != undefined){
                          //set authInfo variable with the sessionId to send it in the requests
                          localStorage.setItem("authInfo",auth.data.sessionId);
                          //if login go to the list default first page
                          $state.go('list');
                        }else{
                          //throw alert INCORRECT CREDENTIALS if username or password was bad
                          toastr.error("INCORRECT CREDENTIALS", 'Error', {timeOut: 3000});
                        }
                    }, function(data){
                        $state.go('login');
                        toastr.error(data.error_description, 'Error', {timeOut: 3000});
                    });
            }
        })
})();
