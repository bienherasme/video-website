(function () {
    angular.module('crossapp')
        .service('VideoService', function ($http, $q, $httpParamSerializer) {
            var self = this;
            let apiUrl = "http://localhost:3000";

            self.findall = findall;
            self.findById = findById;
            self.rate = rate;

            function findall(skipIn,limitIn) {
                var deferred = $q.defer();
                $http.get(apiUrl + '/videos',{params:{sessionId:localStorage.getItem("authInfo"),skip:skipIn,limit:limitIn}})
                .then(function(success){
                  deferred.resolve(success.data.data);
                })

                return deferred.promise;
            }
            function findById(id) {
                var deferred = $q.defer();
                $http.get(apiUrl + '/video',{params:{sessionId:localStorage.getItem("authInfo"),videoId:id}})
                .then(function(success){
                  deferred.resolve(success.data.data);
                })

                return deferred.promise;
            }

            function rate(usrRating,usrVideoId) {
                var deferred = $q.defer();

                  $http.post(apiUrl + '/video/ratings',{videoId:usrVideoId,rating:usrRating},{params:{sessionId:localStorage.getItem("authInfo")}})
                  .then(function(success){
                    deferred.resolve(success.data.data);
                  })

                return deferred.promise;
            }
        })
}());
