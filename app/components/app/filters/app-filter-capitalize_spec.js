(function () {
  'use strict';

  describe('App Filters', function () {

    beforeEach(module('app.filters'));

    describe('capitalize', function() {

      it('should capitalize input', inject(function(capitalizeFilter) {

        expect(capitalizeFilter('title')).to.equal('Title');

      }));

      it('should return empty string if no input', inject(function(capitalizeFilter) {

        expect(capitalizeFilter()).to.equal('');

      }));

    });

  });

})();
