/* global describe, it */

(function () {
    'use strict';

    describe('Smart-Slider', function() {
    	
    	describe('#create', function() {
    		it('should be able to create a new slider', function() {
    			var slider = smartSlider.create();

    			expect(slider).to.be.an("object");
    			
    		});
    	});
    });
    
})();