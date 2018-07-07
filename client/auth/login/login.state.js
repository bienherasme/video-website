(function () {
    angular.module('crossapp')
        .config(function ($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    params: { cachebust: { dynamic: true } },
                    templateUrl: '/auth/login/login.html',
                    controller: 'LoginController as ctrl'
                })
        });
})();
