(function () {
    angular.module('crossapp')
        .config(function ($stateProvider) {
            $stateProvider
                .state('detail', {
                    url: '/videos/:id',
                    parent: 'video',
                    params: { cachebust: { dynamic: true } },
                    views: {
                        'content': {
                            templateUrl: 'main/video/detail/video.detail.html',
                            controller: 'VideoDetailController as ctrl'
                        }
                    }
                });
        })
})();
