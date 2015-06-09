(function () {
  'use strict';

  describe('Rideshares Directive', function () {

    describe('Rideshares Form Input', function () {

      var scope,
        elm;

      beforeEach(module('rideshares.directives'));

      beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        elm = angular.element('<div forminput><label></label></div>');
        $compile(elm)(scope);
        // run it
        // compile
        scope.$apply();
      }));

      it('should add to the label classList', function() {
        // div
        var div = angular.element(elm)[0];
        // TODO: iterate over properties and find/match the value instead of hardcode point to position
        div.classList[1].should.equal('element-padding');
        // form label
        var label = angular.element(elm)[0].querySelector('label');
        label.classList[0].should.equal('bold');
      });

    });

  });

})();
