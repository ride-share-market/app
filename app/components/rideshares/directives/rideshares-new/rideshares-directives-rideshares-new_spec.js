(function () {
  'use strict';

  describe('Rideshares Directive', function () {

    describe('Rideshares New', function () {

      var scope,
        elm,
        $location,
        isolateScope;

      // Load the directives module
      beforeEach(module('rideshares.directives', function($provide) {

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

        $provide.factory('RidesharesCreateSvc', function () {
          return {
            create: function (rideshare) {
              // success response
              if(rideshare.itinerary.route.length > 1) {
                return {
                  then: function (successCallback) {
                    successCallback({
                      _id: 'abc123'
                    });
                  }
                };
              }
              // error response
              else {
                return {
                  then: function (successCallback, errorCallback) {
                    errorCallback('Rideshare Create Errors');
                  }
                };
              }
            }
          };
        });

      }));

      // Load the test cached HTML templates
      beforeEach(module('templates'));

      beforeEach(inject(function ($rootScope, $compile,_$location_) {
        scope = $rootScope.$new();
        elm = angular.element('<rsm-rideshares-new/>');
        $location = _$location_;
        $compile(elm)(scope);
        scope.$apply();
        isolateScope = elm.isolateScope().vm;
      }));

      it('should locate to new rideshare url path on save success', function (done) {

        expect($location.path()).to.equal('');

        isolateScope.rideshare.itinerary.route.push({a:1});
        isolateScope.rideshare.itinerary.route.push({a:2});

        isolateScope.create();

        expect($location.path()).to.match(/abc123/);

        done();

      });

      it('should handle server error response on save error', function (done) {

        expect(isolateScope.errors).to.be.undefined;

        expect($location.path()).to.equal('');

        isolateScope.create();

        expect($location.path()).to.equal('');

        expect(isolateScope.errors).to.not.be.undefined;

        done();

      });

    });

  });

})();
