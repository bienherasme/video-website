(function () {
    angular.module('crossapp')
      .filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
      }]);
    angular.module('crossapp')
        .controller('VideoDetailController', function ($scope, $localStorage, $state,$stateParams,
                                                $rootScope, toastr, $ocLazyLoad,VideoService) {
            var self = this;
            window.playPause = playPause;
            self.calculateAverage = calculateAverage;
            self.calculateAverageSug = calculateAverageSug;
            self.videoFilter = videoFilter;
            self.onRatingChange = onRatingChange;
            self.videoDetail = videoDetail;
            self.loadMoreRecords = loadMoreRecords;
            let count = 0;
            self.videos = [];


              if($stateParams.id){
                  getVideo($stateParams.id);
              }

            //function get the video with the id in the url
            function getVideo(id){
              VideoService.findById(id)
                  .then(function (data) {
                      self.video = data;
                      self.calculateAverage();
                  }, function(data){
                      toastr.error(data.error_description, 'Error', {timeOut: 3000});
                  });
            }
            //filter that ensure the current video does not appear in the suggestion list
            function videoFilter(){
              return function( video ) {
                return video._id != self.video._id;
              };
            }
            //play current video and pause the others
            function playPause(elem){
              var videos = document.getElementsByTagName('video');
              for(var i=0; i<videos.length; i++){
            		if(videos[i] == elem) continue;
            		if(videos[i].played.length > 0 && !videos[i].paused){
            		  videos[i].pause();
            		}
            	}
            }
            //calculate the average of the current video ratings
            function calculateAverage(){
                var sum = 0;
                for(var i = 0; i < self.video.ratings.length; i++){
                    sum += parseInt(self.video.ratings[i], 10);
                }

                self.avg = sum/self.video.ratings.length;
            };
            //calculate the average of the suggestion videos ratings
            function calculateAverageSug(ratings){
                var sum = 0;
                for(var i = 0; i < ratings.length; i++){
                    sum += parseInt(ratings[i], 10);
                }

                var avg = sum/ratings.length;

                return avg;
            };
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
            //fired when rating change and save the rating of the current video
            function onRatingChange($event){
              VideoService.rate($event.rating,self.video._id)
                  .then(function (data) {
                    swal("Thanks", "Your rating was saved successfully!", "success");
                  }, function(data){
                      toastr.error(data.error_description, 'Error', {timeOut: 3000});
                  });
            }
            //change the current video for one of the suggestion videos that you select
            function videoDetail(videoId){
              $state.go('detail',{id:videoId});
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
