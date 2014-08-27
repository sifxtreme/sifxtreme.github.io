var app = angular.module('myApp', []);

app.directive('optIn', function() {
    return {
        restrict: 'E',
        templateUrl: 'optin-template.html',
        transclude: true
    }
})