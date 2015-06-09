(function () {
  'use strict';

  describe('Rideshares Directive', function () {

    describe('Rideshares Itinerary', function () {

      var scope,
        elm,
        isolateScope;

      // Load the directives module
      beforeEach(module('rideshares.directives', function ($provide) {

        // stub out the nested directives, these are tested separately
        $provide.factory('ngAutocompleteDirective', function () {
          return {};
        });

        $provide.factory('$mdDialog', function() {
          return {};
        });

        $provide.factory('$mdMedia', function() {
          return {};
        });

        $provide.factory('RidesharesRouteUpdateSvc', function() {
          return {};
        });

      }));

      // Load the test cached HTML templates
      beforeEach(module('templates'));

      beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();

        // new rideshare has no route yet
        scope.rideshare = {
          itinerary: {
            route: []
          }
        };

        scope.isRouteValid = false;

        scope.onSaveCallBack = sinon.spy();

        elm = angular.element('<rsm-rideshares-itinerary ' +
          'itinerary="rideshare.itinerary" ' +
          'is-route-valid="isRouteValid" ' +
          'on-save="onSaveCallBack(data)"/>');

        $compile(elm)(scope);

        scope.$apply();

        isolateScope = elm.isolateScope().vm;
      }));

      it('should add user route locations and call the onSave() callback', function (done) {

        //console.log('isolateScope', isolateScope);
        expect(scope.rideshare.itinerary.route.length).to.equal(0);

        isolateScope.addPlace();

        // test addPlace() did not add empty route to itinerary
        expect(scope.rideshare.itinerary.route.length).to.equal(0);

        // add a single route
        isolateScope.place = 'Place A';
        isolateScope.placeDetails = {lat: 101, lng: 102};
        isolateScope.addPlace();

        expect(scope.rideshare.itinerary.route.length).to.equal(1);

        // test google place is reset after add
        expect(isolateScope.place).to.equal('');
        expect(isolateScope.placeDetails).to.be.null;

        // add a single route
        isolateScope.place = 'Place B';
        isolateScope.placeDetails = {lat: 103, lng: 104};
        isolateScope.addPlace();

        expect(scope.rideshare.itinerary.route.length).to.equal(2);

        // test google place is reset after add
        expect(isolateScope.place).to.equal('');
        expect(isolateScope.placeDetails).to.be.null;

        isolateScope.save();

        sinon.assert.calledOnce(scope.onSaveCallBack);

        done();
      });

    });

  });

})();
