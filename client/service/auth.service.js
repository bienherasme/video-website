(function () {
    angular.module('crossapp')
        .service('AuthService', function ($http, $q, $httpParamSerializer) {
            var self = this;
            let apiUrl = "http://localhost:3000";

            self.login = login;
            self.logout = logout;

            function logout() {
                var deferred = $q.defer();

                $http.get(apiUrl + '/user/logout',{params:{sessionId:localStorage.getItem("authInfo")}})
                .then(function(success){
                  deferred.resolve(success.data.data);
                })

                return deferred.promise;
            }

            function login(user) {
                var deferred = $q.defer();
                $http.post(apiUrl + '/user/auth',{username:user.username, password:user.password})
                .then(function(success){
                  deferred.resolve(success);
                })

                return deferred.promise;
            }
        })
}());
