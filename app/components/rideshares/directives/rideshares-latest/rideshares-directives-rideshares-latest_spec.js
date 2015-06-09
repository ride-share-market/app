(function () {
  'use strict';

  describe('Rideshares Directive', function () {

    describe('Rideshares Latest', function () {

      var scope,
        isolateScope,
        $httpBackend,
        elm;

      // Load the directives module
      beforeEach(module('rideshares.services'));
      beforeEach(module('rideshares.directives'));
      beforeEach(module('app.services', function ($provide) {
        $provide.factory('AppLocalStorageSvc', function($q) {
          return {
            getItem: function() {
              $q.when(0);
            },
            setItem: function() {
              $q.when(true);
            }
          };
        });
        // Copy in the rideshares latest sorting function.
        // Can't seem to trigger the promise in this service
        $provide.factory('RidesharesWebWorkerSvc', function() {
          return {
            sorter: function(data) {
              return {
                then: function(cb) {
                  var sorted = data.map(function (item) {
                    return {
                      _id: item._id,
                      origin: item.itinerary.route[0].place,
                      destination: item.itinerary.route[item.itinerary.route.length - 1].place,
                      waypoints: item.itinerary.route.length - 2,
                      updated_at: item.updated_at
                    };
                  });
                  cb(sorted);
                }
              };
            }
          };
        });
        $provide.factory('$mdMedia', function() {
          return function() {
            return true;
          };
        });
      }));

      // Load the test cached HTML templates
      beforeEach(module('templates'));

      // Load fixture data
      beforeEach(module('fixture/200-get-rideshares.json'));
      beforeEach(module('fixture/503-service-unavailable.json'));

      beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        elm = angular.element('<rsm-rideshares-latest/>');
        $compile(elm)(scope);
      }));

      it('should render the latest rideshares', function () {
        inject(function (fixture200GetRideshares) {

          // test
          $httpBackend.expectGET('/rideshares').respond(fixture200GetRideshares);

          // run it
          // compile
          scope.$apply();

          isolateScope = elm.isolateScope();

          // http get
          $httpBackend.flush();

          // test
          isolateScope.vm.rideshares[0].hasOwnProperty('origin').should.be.true;
          isolateScope.vm.rideshares[0].hasOwnProperty('destination').should.be.true;

          //TODO: pagination ng-repeat not happening in test.
          //console.log(angular.element(elm).text());
          //console.log(angular.element(elm));
          //expect(angular.element(elm).text()).to.match(/Mountain\ View,\ CA,\ United\ States/);
          //expect(angular.element(elm).text()).to.match(/Woody\ Point,\ Queensland,\ Australia/);

        });
      });

      it('should handle errors', function () {
        inject(function (fixture503ServiceUnavailable) {

          // test
          $httpBackend.expectGET('/rideshares').respond(503, fixture503ServiceUnavailable);

          // run it
          // compile
          scope.$apply();

          // http get
          $httpBackend.flush();

          // test
          expect(angular.element(elm).text()).to.match(/Service\ Unavailable/);

        });
      });

    });

  });

})();
