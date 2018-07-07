(function () {
    angular.module('crossapp')
        .controller('VideoListController', function ($scope, $localStorage, $state,
                                                $rootScope, toastr, $ocLazyLoad,VideoService) {
            var self = this;
            self.videos = [];
            self.calculateAverage = calculateAverage;
            window.playPause = playPause;
            self.videoDetail = videoDetail;
            self.loadMoreRecords = loadMoreRecords;
            let count = 0;
            //function that get videos from skip to limit
            function getAllVideos(skip,limit){
              VideoService.findall(skip,limit)
                  .then(function (data) {
                      data.forEach(function(video){
                        self.videos.push(video);
                      })
                  }, function(data){
                      toastr.error(data.error_description, 'Error', {timeOut: 3000});
                  });
            }
            getAllVideos(0,10);

            //function calculate the average of video ratings
            function calculateAverage(ratings){
                var sum = 0;
                for(var i = 0; i < ratings.length; i++){
                    sum += parseInt(ratings[i], 10);
                }

                var avg = sum/ratings.length;

                return avg;
            };
            //function that play current video and pause others
            function playPause(elem){
              var videos = document.getElementsByTagName('video');
              for(var i=0; i<videos.length; i++){
            		if(videos[i] == elem) continue;
            		if(videos[i].played.length > 0 && !videos[i].paused){
            		  videos[i].pause();
            		}
            	}
            }
            //function redirect to the details of the selected video
            function videoDetail(videoId){
              $state.go('detail',{id:videoId}, { reload: true });
            }
            //load more videos on scroll limit
            function loadMoreRecords(){
              if(count == 0){
                count++;
              }else{
                getAllVideos(self.videos.length,10);
              }
            }

        });
})();
