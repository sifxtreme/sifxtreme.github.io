describe("helloService", function() {
    beforeEach(module('HelloModule'));

    it('should return "hello" when called', function() {
        inject(function(helloService) {
            expect(helloService()).toBe("hello");
        });
    });
});