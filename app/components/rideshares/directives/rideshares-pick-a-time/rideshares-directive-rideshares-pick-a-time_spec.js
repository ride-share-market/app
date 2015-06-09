(function () {
  'use strict';

  describe('Rideshares Directive', function () {

    describe('Rideshares Pick A Time', function () {

      var $scope,
        element,
        $timeout;

      beforeEach(module('rideshares.directives'));

      beforeEach(inject(function ($rootScope, $compile, _$timeout_) {
        $scope = $rootScope.$new();
        element = angular.element('<div id="place_0" pick-a-time><input id="place_0_time"></input></div>');
        $compile(element)($rootScope);
        $timeout = _$timeout_;
      }));

      it('should call jQuery plugin pickadate()', function () {

        var spy = sinon.spy($.fn, 'pickatime');

        $timeout.flush();

        sinon.assert.calledOnce(spy);

      });

    });

  });

})();
