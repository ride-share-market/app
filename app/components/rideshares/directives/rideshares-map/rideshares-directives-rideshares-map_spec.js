(function () {
  'use strict';

  describe('Rideshares Directive', function () {
    
    describe('Rideshares Map', function () {

      var $scope,
        elm,
        $compile,
        $window;

      // Load the directives module
      beforeEach(module('rideshares.directives'));

      // Load the test cached HTML templates
      beforeEach(module('templates'));

      // Load fixture data
      beforeEach(module('fixture/google-place/mountain-view-ca-usa.json'));
      beforeEach(module('fixture/google-place/palo-alto-ca-usa.json'));
      beforeEach(module('fixture/google-place/east-palo-alto-ca-usa.json'));
      beforeEach(module('fixture/google-place/sydney-nsw-au.json'));
      beforeEach(module('fixture/google-place/auckland-nz.json'));

      beforeEach(inject(function ($rootScope, _$compile_, _$window_) {

        $scope = $rootScope.$new();

        $scope.route = [];

        $scope.isRouteValid = false;

        elm = angular.element('<rsm-rideshares-map route="route" is-route-valid="isRouteValid"></rsm-rideshares-map>');

        $compile = _$compile_;

        $window = _$window_;

      }));

      it('should resolve a valid google maps route', inject(function (fixtureGooglePlaceMountainViewCaUsa, fixtureGooglePlacePaloAltoCaUsa, fixtureGooglePlaceEastPaloAltoCaUsa) {

        // A valid Google places response as at 2014-10-05
        var origin = fixtureGooglePlaceMountainViewCaUsa;

        // A valid Google places response as at 2014-10-05
        var waypoint = fixtureGooglePlacePaloAltoCaUsa;

        // A valid Google places response as at 2014-10-05
        var destination = fixtureGooglePlaceEastPaloAltoCaUsa;

        var googleApiMockMapsSpies = {
          setMap: sinon.spy(),
          setDirections: sinon.spy(),
          LatLng: sinon.spy(),
          Map: sinon.spy(),
          route: sinon.spy()
        };

        var GoogleApiMock = function () {
          return {
            maps: {
              LatLng: googleApiMockMapsSpies.LatLng,
              DirectionsRenderer: function () {
                return {
                  setMap: googleApiMockMapsSpies.setMap,
                  setDirections: googleApiMockMapsSpies.setDirections                };
              },
              Map: googleApiMockMapsSpies.Map,
              DirectionsService: function () {
                return {
                  route: function (request, callback) {
                    googleApiMockMapsSpies.route();
                    callback({}, 'OK');
                  }
                };
              },
              TravelMode: function () {
                return {
                  DRIVING: true
                };
              },
              DirectionsStatus: {
                OK: 'OK'
              }
            }
          };
        };

        $window.google = new GoogleApiMock();

        // Google API spies
        var DirectionsRendererSpy = sinon.spy($window.google.maps, 'DirectionsRenderer');
        var DirectionsServiceSpy = sinon.spy($window.google.maps, 'DirectionsService');

        // compile
        $compile(elm)($scope);

        // run it
        $scope.$apply();

        // Adding a single waypoint does not calcRoute
        $scope.route.push(origin);

        $scope.$apply();
        //expect($window.google.maps.DirectionsRenderer.calls.length).to.equal(0);

        // Two or more waypoints will calcRoute
        $scope.route.push(waypoint);
        $scope.route.push(destination);
        $scope.$apply();

        $scope.isRouteValid.should.be.true;

        // test directive calls google APIs
        sinon.assert.calledOnce(googleApiMockMapsSpies.LatLng);
        sinon.assert.calledOnce(googleApiMockMapsSpies.setMap);
        sinon.assert.calledOnce(googleApiMockMapsSpies.setDirections);
        sinon.assert.calledOnce(googleApiMockMapsSpies.Map);
        sinon.assert.calledOnce(googleApiMockMapsSpies.route);
        sinon.assert.calledOnce(DirectionsRendererSpy);
        sinon.assert.calledOnce(DirectionsServiceSpy);

      }));

      it('should reject an invalid google maps route', inject(function (fixtureGooglePlaceSydneyNswAu, fixtureGooglePlaceAucklandNz) {

        // Invalid Google maps route. There is no driving route from Sydney Australia to Auckland New Zealand

        // A valid Google places response as at 2014-10-05
        var origin = fixtureGooglePlaceSydneyNswAu;

        // A valid Google places response as at 2014-10-05
        var destination = fixtureGooglePlaceAucklandNz;

        var MockGoogleApi = function () {
          return {
            maps: {
              LatLng: function () {
                return {};
              },
              DirectionsService: function () {
                return {
                  route: function (request, callback) {
                    callback({}, 'ZERO_RESULTS');
                  }
                };
              },
              TravelMode: function () {
                return {
                  DRIVING: true
                };
              },
              DirectionsStatus: {
                OK: 'OK'
              }
            }
          };
        };

        $window.google = new MockGoogleApi();

        // Google API spies
        // Google API spies
        var LatLngSpy = sinon.spy($window.google.maps, 'LatLng');
        var DirectionsServiceSpy = sinon.spy($window.google.maps, 'DirectionsService');

        // compile
        $compile(elm)($scope);

        // run it
        $scope.$apply();

        $scope.route.push(origin);
        $scope.route.push(destination);

        $scope.$apply();

        $scope.isRouteValid.should.be.false;

        // test directive calls google APIs
        sinon.assert.calledOnce(DirectionsServiceSpy);
        sinon.assert.calledOnce(LatLngSpy);

      }));

    });

  });

})();
