(function () {
    angular.module('crossapp')
        .config(function ($stateProvider) {
            $stateProvider
                .state('main', {
                    abstract: true,
                    templateUrl: 'main/main.html',
                    controller: 'MainController as ctrl'
                });
        })
})();
