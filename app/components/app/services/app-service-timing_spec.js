(function () {
  'use strict';

  describe('App', function () {

    describe('Service', function () {

      describe('Timing', function () {

        beforeEach(module('app.services'));

        var $timeout;

        var AppTimingSvc;

        beforeEach(function () {
          inject(function (_$timeout_, _AppTimingSvc_) {
            $timeout = _$timeout_;
            AppTimingSvc = _AppTimingSvc_;
          });
        });

        it('should', function () {

          // start the timer
          var timing = AppTimingSvc.timing();

          timing().should.be.a('number');

        });

      });

    });

  });

})();
