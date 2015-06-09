(function () {
  'use strict';

  describe('Rideshares Directive', function () {

    describe('Rideshares Show', function () {

      var scope,
        $httpBackend,
        elm;

      beforeEach(module('rideshares.services'));
      beforeEach(module('rideshares.directives', function ($provide) {

        // stub out the nested directive, this is tested separately
        //$provide.factory('rsmGoogleMapDirectionsDirective', function () {
        //  return {};
        //});

        $provide.factory('JwtSvc', function ($q) {
          var deferred = $q.defer();
          deferred.resolve({
            iat: 1416218140,
            id: '54354a2e1268cf741d84c3e8',
            name: 'Test'
          });
          return {
            getUser: function () {
              return deferred.promise;            }
          };
        });
      }));

      // Load the test cached HTML templates
      beforeEach(module('templates'));

      // Load fixture data
      beforeEach(module('fixture/200-get-rideshare.json'));
      beforeEach(module('fixture/404-get-rideshare.json'));

      beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {

        scope = $rootScope.$new();

        $httpBackend = _$httpBackend_;

        elm = angular.element('<rsm-rideshares-show rideshare-id="545d8cab03badf4d7d8c89c9"></rsm-rideshares-show>');

        $compile(elm)(scope);

      }));

      it('should compile to a HTML node', function(done) {
        inject(function (fixture200GetRideshare) {

          // test
          $httpBackend.expectGET('/rideshares/545d8cab03badf4d7d8c89c9').respond(200, fixture200GetRideshare);

          // run it
          // compile
          scope.$apply();

          // http get
          $httpBackend.flush();

          // test (from fixture data)
          expect(angular.element(elm).text()).to.match(/Mountain\ View,\ CA,\ United\ States/);
          expect(angular.element(elm).text()).to.match(/Palo\ Alto,\ CA,\ United\ States/);

          var isolateScope = elm.isolateScope().vm;

          expect(isolateScope.isOwner).to.be.true;

          done();

        });
      });

      it('should handle errors', function(done) {
        inject(function (fixture404GetRideshare) {

          // test
          $httpBackend.expectGET('/rideshares/545d8cab03badf4d7d8c89c9').respond(404, fixture404GetRideshare);

          // run it
          // compile
          scope.$apply();

          // http get
          $httpBackend.flush();

          // test
          expect(angular.element(elm).text()).to.match(/Rideshare\ not\ found\./);

          done();

        });
      });

    });

  });

})();