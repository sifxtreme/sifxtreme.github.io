var app = angular.module('myApp', []);

app.directive('makeEditable', function($sce) {
  return {
	  restrict: 'A',
	  templateUrl: 'editable.html',
	  transclude: true,
	  scope: true,
	  link: function(scope, element, attrs){
	  	scope.editState = false;
	  	scope.buttonText = "Edit";

	  	scope.toggleEdit = function(){
	  		scope.editState = !scope.editState;
	  		scope.buttonText = (scope.editState) ? "Save" : "Edit";
	  	}
	  }
  }
})