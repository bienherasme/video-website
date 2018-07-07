(function () {
    angular.module('crossapp')
        .config(function ($stateProvider) {
            $stateProvider
                .state('list', {
                    url: '/videos',
                    parent: 'video',
                    params: { cachebust: { dynamic: true } },
                    views: {
                        'content': {
                            templateUrl: 'main/video/list/video.list.html',
                            controller: 'VideoListController as ctrl'
                        }
                    }
                });
        })
})();
