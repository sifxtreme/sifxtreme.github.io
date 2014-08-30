describe('calendar directive', function() {
	
	var scope,
		element,
		compiled,
		html,
		months,
		d;

	beforeEach(module("calendarDemoApp"));
	beforeEach(module('calendar.html'));
	
	beforeEach(inject(function($rootScope, $compile) {
		html = "<calendar></calendar>";
		scope = $rootScope.$new();
		compiled = $compile(html)
		element = compiled(scope);
		scope.$digest();
	}));

	beforeEach(function() {
		months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
	});

	beforeEach(function() {
		d = new Date();
		element.scope().month = months[d.getMonth()];
		element.scope().year = d.getFullYear();
	});

	it('should render the element correctly', function(){
    	expect(element.html()).toContain("dayHeader");
    	expect(element.text()).toContain("Wednesday");
    	expect(element.find('#leftMonth').attr('ng-click')).toBeTruthy();
	});

	it('should have the correct month and year', function(){
		expect(element.scope().month).toBe(months[d.getMonth()]);
		expect(element.scope().year).toBe(d.getFullYear());
	});

	it('should increment the year when December', function(){
		var year = element.scope().year;

		element.scope().month = "December";
		element.find('#rightMonth').click();

		expect(element.scope().month).toBe("January");
		expect(element.scope().year).toBe(year+1);
	});

	it('should decrement the year when January', function(){
		var year = element.scope().year;

		element.scope().month = "January";
		element.find('#leftMonth').click();

		expect(element.scope().month).toBe("December");
		expect(element.scope().year).toBe(year-1);
	});

});