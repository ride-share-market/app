(function () {
  'use strict';

  describe('Rideshares Service', function () {

    describe('Rideshares Web Worker', function () {

      beforeEach(module('rideshares.services'));

      // Load fixture data
      beforeEach(module('fixture/200-get-rideshares.json'));

      var $scope,
        RidesharesWebWorkerSvc;

      // $apply only trigger's one digest -  works (but it's very dirty).
      var triggerDigests = function () {
          return setInterval(function () {
            $scope.$digest();
          }, 10);
        };

      beforeEach(inject(function ($rootScope, _RidesharesWebWorkerSvc_) {
        $scope = $rootScope.$new();
        RidesharesWebWorkerSvc = _RidesharesWebWorkerSvc_;
      }));

      it('should web worker', function (done) {

        inject(function (fixture200GetRideshares) {

          var rideshares = fixture200GetRideshares.rideshares;

          RidesharesWebWorkerSvc.sorter(rideshares).then(function(res) {
            res[0].origin.should.equal(fixture200GetRideshares.rideshares[1].itinerary.route[0].place);
            res[0].destination.should.equal(fixture200GetRideshares.rideshares[1].itinerary.route[1].place);
            done();
          });

          triggerDigests();

        });

      });

    });

  });

})();
