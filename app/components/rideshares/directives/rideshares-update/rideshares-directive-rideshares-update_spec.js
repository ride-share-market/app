(function () {
  'use strict';

  describe('Rideshares Directive', function () {

    describe('Rideshares Update', function () {

      var scope,
        $httpBackend,
        $location,
        elm,
        isolateScope;

      beforeEach(module('app.services'));
      beforeEach(module('rideshares.services'));
      beforeEach(module('rideshares.directives', function ($provide) {

        $provide.factory('ngAutocompleteDirective', function () {
          return {};
        });

        $provide.factory('$mdDialog', function () {
          return {};
        });

        $provide.factory('$mdMedia', function () {
          return function () {
          };
        });

        $provide.factory('JwtSvc', function ($q) {
          var deferred = $q.defer();
          deferred.resolve({
            iat: 1416218140,
            id: '54354a2e1268cf741d84c3e8',
            name: 'Test'
          });
          return {
            getUser: function () {
              return deferred.promise;
            }
          };
        });

        $provide.factory('Angularytics', function () {
          return {
            trackTiming: function() {
              return true;
            }
          };
        });

      }));


      // Load the test cached HTML templates
      beforeEach(module('templates'));

      // Load fixture data
      beforeEach(module('fixture/200-get-rideshare.json'));
      beforeEach(module('fixture/404-get-rideshare.json'));
      beforeEach(module('fixture/400-put-rideshare.json'));
      beforeEach(module('fixture/200-delete-rideshare.json'));

      beforeEach(inject(function ($rootScope, _$location_, $compile, _$httpBackend_, fixture200GetRideshare) {

        scope = $rootScope.$new();

        $location = _$location_;

        $httpBackend = _$httpBackend_;

        elm = angular.element('<rsm-rideshares-update rideshare-id="545d8cab03badf4d7d8c89c9"></rsm-rideshares-update>');

        $compile(elm)(scope);

        // Load a rideshare into the update view

        // test
        $httpBackend.expectGET('/rideshares/545d8cab03badf4d7d8c89c9').respond(200, fixture200GetRideshare);

        // run it/compile
        scope.$apply();

        // http get
        $httpBackend.flush();

        // test (from fixture data)
        expect(angular.element(elm).text()).to.match(/Mountain\ View,\ CA,\ United\ States/);
        expect(angular.element(elm).text()).to.match(/Palo\ Alto,\ CA,\ United\ States/);

        isolateScope = elm.isolateScope().vm;

      }));

      it('should 200 rideshare update', function (done) {

        expect($location.path()).to.equal('');

        $httpBackend.expectPUT('/rideshares/545d8cab03badf4d7d8c89c9').respond(200);

        isolateScope.update();

        $httpBackend.flush();

        expect($location.path()).to.match(/rideshares\/[0-9a-fA-F]{24}/);

        done();

      });

      it('should 400 reject rideshare update', function (done) {

        inject(function (fixture400PutRideshare) {

          expect($location.path()).to.equal('');

          $httpBackend.expectPUT('/rideshares/545d8cab03badf4d7d8c89c9').respond(400, fixture400PutRideshare);

          isolateScope.update();

          $httpBackend.flush();

          expect($location.path()).to.equal('');

          done();

        });

      });

      it('should 200 delete a rideshare', function (done) {

        inject(function (fixture200DeleteRideshare) {

          expect($location.path()).to.equal('');

          $httpBackend.expectDELETE('/rideshares/545d8cab03badf4d7d8c89c9').respond(200, fixture200DeleteRideshare);

          isolateScope.remove();

          $httpBackend.flush();

          expect($location.path()).to.not.equal('');

          done();

        });

      });

      it('should handle delete rideshare errors', function(done) {

        expect($location.path()).to.equal('');

        $httpBackend.expectDELETE('/rideshares/545d8cab03badf4d7d8c89c9').respond(500);

        isolateScope.remove();

        $httpBackend.flush();

        expect($location.path()).to.equal('/error');

        done();

      });

    });

  });

})();
