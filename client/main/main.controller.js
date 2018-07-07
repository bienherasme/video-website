(function () {
    angular.module('crossapp')
        .controller('MainController', function ($scope, $localStorage, $state,
                                                $rootScope, toastr, $ocLazyLoad,AuthService) {
            var self = this;

            self.logOut = logOut;

            function logOut() {
                AuthService.logout()
                    .then(function (authinfo) {
                        localStorage.removeItem("authInfo");
                        $state.go('login');
                    }, function(data){
                        $state.go('login');
                        toastr.error(data.error_description, 'Error', {timeOut: 3000});
                    });
            }

        });
})();
