angular.module('instagramSearchApp', ['ngAnimate'])
	.controller('InstagramSearchController', function($scope, $timeout, $q, $http){

		function wait(){
			var defer = $q.defer();
			$timeout(function(){
				defer.resolve();
			}, 1500);
			return defer.promise;
		}

		function notification(){
			$scope.showNotification = "Searching Instagram for photos tagged with \"" + $scope.searchTerm + "\"";
			return wait().then(function(){
				$scope.showNotification = "";
			});
		}
		
		$scope.getInstagramResults = function(){
			$scope.hasError = false;
			$scope.results = null;
			
			if($scope.instaform.$invalid){
				$scope.showNotification = "Please enter a search term";
				$scope.hasError = true;
				return;
			}


			var url = 'https://api.instagram.com/v1/tags/'+ $scope.searchTerm +'/media/recent';
			var request = {
				callback: 'JSON_CALLBACK',
				client_id: '2897297205c64c28bb12e13ca1be5332'
			};

			$http({
				method: 'JSONP',
				url: url,
				params: request
			}).
			success(function(result){

				notification().then(function(){
					$scope.results = result.data;
					var numberOfResults = $scope.results.length;
					$scope.showNotification = "We found " + $scope.results.length + " result" + ($scope.results.length == 1 ? '' : 's');
				});

			}).
			error(function(result){
				notification().then(function(){
					$scope.showNotification = "Error Searching Instagram";
					$scope.hasError = true;
				})

			});

		};

	

	});



// CLIENT ID	2897297205c64c28bb12e13ca1be5332
// CLIENT SECRET	90f88453be444f21b56fedf3980563bd
// WEBSITE URL	http://sifxtreme.github.io/thinkful-angular-instagram-searcher/
// REDIRECT URI	http://sifxtreme.github.io/thinkful-angular-instagram-searcher/