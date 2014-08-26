describe("ccApp", function() {
    beforeEach(module("ccApp"));

    describe("test change order function", function() {
        var ctrl, scope;
        beforeEach(inject(function($controller, $rootScope){
            scope = $rootScope.$new();
            ctrl = $controller('CountriesCtrl', {
                $scope : scope
            });
        }));

        it('should change the reverse sort', function(){
            console.log(scope.order);
        });
    });

    describe("all routes", function() {
        it('routes should point to correct controller', 
            inject(function($route) {
            expect($route.routes["/"].controller).toBe("HomeCtrl");
            expect($route.routes["/countries"].controller).toBe("CountriesCtrl");
            expect($route.routes["/countries/:country"].controller).toBe("CountryCtrl");
        }));
        
        it('routes should have correct template url', 
            inject(function($route) {
            expect($route.routes["/"].templateUrl).toBe("./views/home.html");
            expect($route.routes["/countries"].templateUrl).toBe("./views/countries.html");
            expect($route.routes["/countries/:country"].templateUrl).toBe("./views/country.html");
        }));
    });


});