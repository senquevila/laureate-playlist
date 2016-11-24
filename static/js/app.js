var app = angular.module('LaureatePlayList', []);

app.controller('SearchCtrl', function($scope, $http, $log) {
	$scope.searchLimit = 12;
	$scope.loading = true;
	$scope.items = [];

	$scope.deepSearch = function(isNewSearch) {
		var next = '';

		if (typeof $scope.nextPageToken !== 'undefined') {
			next = $scope.nextPageToken;
		}

		if (!isNewSearch) {
			$scope.loading = false;
		}

		$http.get('https://www.googleapis.com/youtube/v3/search', {
	      params: {
	        key: 'AIzaSyBy9fQwZZcpqut2-wr4W20WAC9XQIDmzPU',
			channelId: 'UCvS6-K6Ydmb4gH-kim3AmjA',
	        type: 'video',
	        maxResults: '50',
	        part: 'id,snippet',
	        fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/high,items/snippet/publishedAt,items/snippet/channelTitle,nextPageToken',
			order: 'date',
			pageToken: isNewSearch ? '' : next
	      }
	    })
		.then(function(response) {
			$scope.items = $scope.items.concat(response.data.items);
			$scope.nextPageToken = response.data.nextPageToken;

			if (typeof $scope.nextPageToken !== 'undefined') {
				$scope.deepSearch(false);
			} else {
				$scope.loading = false;
			}

			//$log.info(response.data);
		})

		// BUG: No llega a este estado
		.finally(function(){
			$scope.loading = false;
		});
	}

	$scope.youtubeUrl = function(item) {
		var HOST = 'https://www.youtube.com/watch?v=';
		var url = HOST + item.id.videoId;

		return url;
	}

	$scope.youtubeEmbed = function(item) {
		var HOST = 'https://www.youtube.com/embed/';
		var url = HOST + item.id.videoId;

		return url;
	}

	$scope.moreLimit = function() {
		$scope.searchLimit += 12;
	}

	$scope.resetLimit = function() {
		$scope.searchLimit = 12;
	}

	$scope.formatDate = function(item) {
		var itemDate = new Date(item.snippet.publishedAt);

		return ('0' + (itemDate.getDate()+1)).slice(-2) + '-' +
			('0' + (itemDate.getMonth()+1)).slice(-2) + '-' +
			itemDate.getFullYear();
	}

	$scope.imageUrl = function(item) {
		return item.snippet.thumbnails.high.url;
	}
});
