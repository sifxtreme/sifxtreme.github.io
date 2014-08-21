angular.module('ccApp', ['ngRoute', 'ngAnimate', 'ccLibrary'])
.run(['$rootScope', '$location', '$timeout', function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 1000);
    });
}])
.config(['$routeProvider', function($routeProvider){

$routeProvider
	.when('/', {
	    templateUrl : './home.html'
	})
	.when('/countries', {
	    templateUrl : './countries.html',
	    controller : 'CountriesCtrl',
	    resolve: {
	    	countries: ['ccCountries', function(ccCountries){
	    		return ccCountries();
	    	}]
	    }
	})
	.when('/countries/:country', {
	    templateUrl : './country.html',
	    controller : 'CountryCtrl',
	    resolve: {
	    	countryInfo: ['$route', 'ccCountry', function($route, ccCountry){
	    		return ccCountry($route.current.params.country);
	    	}],
	    	neighborInfo: ['$route', 'ccNeighbors', function($route, ccNeighbors){
	    		return ccNeighbors($route.current.params.country);
	    	}],
	    	capitalInfo: ['$route', 'ccCapital', function($route, ccCapital){
	    		return ccCapital($route.current.params.country);
	    	}]
	    }
	})
	.when('/error', {
	    template : '<p>Error Page: Not Found</p>'
	})
	.otherwise({
	  redirectTo : '/error'
  });

}])
.controller('CountriesCtrl', ['$scope', '$location', 'countries', function($scope, $location, countries){	
	$scope.order = 'countryName';
	$scope.reverseSort = false;

	$scope.changeOrder = function(order){
		$scope.reverseSort = (order == $scope.order) ? !$scope.reverseSort : false;
		$scope.order = order || 'countryName';
	}

	$scope.changeLocation = function(location){
		$location.path('/countries/'+location);
	}

	$scope.countries = countries.geonames;
}])
.controller('CountryCtrl', ['$scope', 'countryInfo', 'neighborInfo', 'capitalInfo', function($scope, countryInfo, neighborInfo, capitalInfo){
	$scope.country = countryInfo.geonames[0];
	$scope.neighbors = neighborInfo.geonames;
	$scope.capital = capitalInfo.geonames[0];
}])

