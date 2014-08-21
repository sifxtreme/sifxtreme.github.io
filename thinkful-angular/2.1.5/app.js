angular.module('waiterApp', ['ngRoute', 'ngAnimate'])
.run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 250);
    });
})
.run(function($rootScope, $location){

	$rootScope.initAll = function(){
		$rootScope.earnings = {
			mealCount: 0,
			tipTotal: 0
		};
	};
	$rootScope.initAll();

  $rootScope.reset = function(){
    $rootScope.initAll();
    $location.path('/new-meal');
  };

	$rootScope.$watchGroup(['earnings.tipTotal', 'earnings.mealCount'], function(newValues, oldValues, scope) {
		if($rootScope.earnings.mealCount != 0){
			$rootScope.earnings.avgTipPerMeal = $rootScope.earnings.tipTotal/$rootScope.earnings.mealCount;
		}
		else{
			$rootScope.earnings.avgTipPerMeal = 0;
		}
	});


})
.config(function($routeProvider){

$routeProvider
	.when('/', {
	    templateUrl : './home.html',
	    controller: 'HomeCtrl'
	})
	.when('/new-meal', {
	    templateUrl : './new-meal.html',
	    controller : 'MealCtrl'
	})
	.when('/my-earnings', {
	    templateUrl : './my-earnings.html',
	    controller : 'EarningsCtrl'
	})
	.when('/error', {
	    template : '<p>Error Page: Not Found</p>'
	})
	.otherwise({
	  redirectTo : '/error'
  });

})
.service('sharedProperties', function(){

})
.controller('MealCtrl', function($scope, $rootScope){
	$rootScope.navigationValue = 'meal'

	$scope.resetDetails = function(){
		$scope.data.mealPrice = '';
		$scope.data.taxRate = '';
		$scope.data.tipPercentage = '';
	};

	$scope.initCharges = function(){
		$scope.data.subtotal = 0;
		$scope.data.tip = 0;
		$scope.data.total = 0;
	};

	$scope.init = function(){
		$scope.data = {};
		$scope.data.formError = "";
		$scope.resetDetails();
		$scope.initCharges();
	};

	$scope.init();

	$scope.submitDetails = function(){
		if($scope.enterPriceForm.$invalid){
			$scope.data.formError = "Please enter valid values ";
		}
		else{
			$scope.data.formError = "";
			$rootScope.earnings.mealCount++;
			$rootScope.earnings.tipTotal += $scope.data.tip;
		}
	};

	$scope.$watchGroup(['data.mealPrice', 'data.taxRate', 'data.tipPercentage'], function(newValues, oldValues, scope) {
		if($scope.enterPriceForm.$invalid){
			$scope.initCharges();
		}
		else{
			$scope.data.formError = "";
			$scope.data.subtotal = $scope.data.mealPrice * (1 + $scope.data.taxRate/100);
			$scope.data.tip = $scope.data.mealPrice * ($scope.data.tipPercentage/100);
			$scope.data.total = $scope.data.subtotal + $scope.data.tip;
		}
	});

})
.controller('HomeCtrl', function($scope, $rootScope){
	$rootScope.navigationValue = 'home'
})
.controller('EarningsCtrl', function($scope, $rootScope){
	$rootScope.navigationValue = 'earnings'
})

