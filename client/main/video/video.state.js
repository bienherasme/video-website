(function () {
    angular.module('crossapp')
        .config(function ($stateProvider) {
            $stateProvider
                .state('video', {
                    parent: 'main',
                    views: {
                        'content': {
                            templateUrl: 'main/video/video.html',
                            controller: 'VideoController as ctrl'
                        }
                    }
                })
        })
})();
