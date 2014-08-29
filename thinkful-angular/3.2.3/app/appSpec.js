describe('makeEditable', function() {
	
	var scope,
		element,
		compiled,
		html,
		inside;

	beforeEach(module("myApp"));
	beforeEach(module('editable.html'));
	beforeEach(inject(function($rootScope, $compile) {

		inside = "some random string";
		
		html  = "";
		html += "<div make-editable>";
		html += inside;
		html += "</div>";

		scope = $rootScope.$new();
		compiled = $compile(html)
		element = compiled(scope);
		scope.$digest();

	}));
	it('should render the element correctly', function(){
    	expect(element.text()).toContain(inside);
    	expect(element.find(".myEditable").attr("contenteditable")).toBe("false");
    	expect(element.find('button').text()).toBe("Edit");
			expect(element.find('.myEditable').hasClass('editable')).toBeFalsy();
    	expect(element.find('button').hasClass('edit')).toBeTruthy();

			element.find('button').click();
    	expect(element.find('button').text()).toBe("Save");
    	expect(element.find('button').attr('ng-click')).toBeTruthy();
    	expect(element.find(".myEditable").attr("contenteditable")).toBe("true");
			expect(element.find('.myEditable').hasClass('editable')).toBeTruthy();
    	expect(element.find('button').hasClass('edit')).toBeFalsy();
	});
});