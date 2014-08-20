angular.module('waiterApp', ['ngRoute'])
.config(function($routeProvider){

$routeProvider
	.when('/', {
	    templateUrl : './home.html',
	})
	.when('/new-meal', {
	    templateUrl : './new-meal.html',
	})
	.when('/my-earnings', {
	    templateUrl : './my-earnings.html',
	})
	.when('/error', {
	    template : '<p>Error Page: Not Found</p>'
	})
	.otherwise({
	  redirectTo : '/error'
  });

})
.controller('WaiterCtrl', ['$scope', function($scope){

	$scope.resetDetails = function(){
		$scope.mealPrice = '';
		$scope.taxRate = '';
		$scope.tipPercentage = '';
	};

	$scope.initCharges = function(){
		$scope.subtotal = 0;
		$scope.tip = 0;
		$scope.total = 0;
	};

	$scope.initEarnings = function(){
		$scope.tipTotal = 0;
		$scope.mealCount = 0;
	};

	$scope.init = function(){
		$scope.formError = "";
		$scope.resetDetails();
		$scope.initCharges();
		$scope.initEarnings();
	};

	$scope.init();

	$scope.submitDetails = function(){
		if($scope.enterPriceForm.$invalid){
			$scope.formError = "Please enter valid values ";
		}
		else{
			$scope.formError = "";
			$scope.tipTotal += $scope.tip;
			$scope.mealCount++;
		}
	};

	$scope.$watchGroup(['mealPrice', 'taxRate', 'tipPercentage'], function(newValues, oldValues, scope) {
		if($scope.enterPriceForm.$invalid){
			$scope.initCharges();
		}
		else{
			$scope.formError = "";
			$scope.subtotal = $scope.mealPrice * (1 + $scope.taxRate/100);
			$scope.tip = $scope.mealPrice * ($scope.tipPercentage/100);
			$scope.total = $scope.subtotal + $scope.tip;
		}
	});

	$scope.$watchGroup(['tipTotal', 'mealCount'], function(newValues, oldValues, scope) {
		if($scope.mealCount != 0){
			$scope.avgTipPerMeal = $scope.tipTotal/$scope.mealCount;
		}
		else{
			$scope.avgTipPerMeal = 0;
		}
		
	});




}]);