/**
 * Created by bherasme on 12/9/2017.
 */
(function () {
    angular.module('crossapp')
  
        .config(function ($urlRouterProvider, $httpProvider,$locationProvider,$stateProvider) {
            $locationProvider.hashPrefix('');
            $urlRouterProvider.otherwise('/login');

        })
        .run(function ($state, $localStorage, $rootScope,$trace,$transitions) {
          $rootScope.transitions = [];
          //
            $transitions.onStart({}, function(transition) {
              if(transition.$to().name != 'login'){
                if (!localStorage.getItem("authInfo")) {
                    $state.go('login');
                    return;
                }
            }
          });
        });
})();
