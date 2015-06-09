(function () {
  'use strict';

  describe('Users Directive', function () {

    describe('Users Profile', function () {

      var scope,
        $httpBackend,
        elm;

      beforeEach(module('users.services'));
      beforeEach(module('users.directives'));

      // Load the test cached HTML templates
      beforeEach(module('templates'));

      // Load fixture data
      beforeEach(module('fixture/200-get-user-by-id.json'));
      beforeEach(module('fixture/404-get-user-by-id.json'));

      beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {

        scope = $rootScope.$new();

        $httpBackend = _$httpBackend_;

        elm = angular.element('<rsm-user-profile user-id="abc123"></rsm-user-profile>');

        $compile(elm)(scope);

      }));

      it('should render a user profile', function(done) {

        inject(function (fixture200GetUserById) {

          // test
          $httpBackend.expectGET('/users/abc123').respond(fixture200GetUserById);

          // run it
          // compile
          scope.$apply();

          // http get
          $httpBackend.flush();

          // test
          expect(angular.element(elm).text()).to.match(/Net\ Citizen/);

          done();

        });
      });

      it('should handle errors', function(done){

        inject(function (fixture404GetUserById) {

          // test
          $httpBackend.expectGET('/users/abc123').respond(404, fixture404GetUserById);

          // run it
          // compile
          scope.$apply();

          // http get
          $httpBackend.flush();

          // test
          expect(angular.element(elm).text()).to.match(/Account\ profile\ not\ found./);

          done();

        });
      });

    });

  });

})();
