(function () {
  'use strict';

  describe('App Directive Nav SignIn SignOut', function () {

    var $rootScope,
      $scope,
      spy,
      element = angular.element('<rsm-nav-signin-signout toggle-nav-side="true"></rsm-nav-signin-signout>');

    // Load the test cached HTML templates
    beforeEach(module('templates'));

    describe('Signed Out', function () {

      beforeEach(module('app.directives', function ($provide) {

        var mockNavToggleSvc,
          mockJwtSvc;

        spy = sinon.spy();

        mockNavToggleSvc = {
          toggleLeftMenu: spy
        };

        mockJwtSvc = {
          getUser: function () {
            return {
              then: function (callback) {
                callback(null);
              }
            };
          }
        };

        $provide.value('NavToggleSvc', mockNavToggleSvc);
        $provide.value('JwtSvc', mockJwtSvc);

      }));

      beforeEach(inject(function (_$rootScope_, $compile) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $compile(element)($scope);
      }));

      it('should show sign in text', function (done) {
        $scope.$apply();
        $scope.isSignedIn().should.be.false;
        expect(element.text()).to.match(/Sign\ In/);
        done();
      });

      it('should toggle nav side menu on click', function(done) {
        $scope.$apply();
        $scope.toggleLeftMenuOnSign();
        sinon.assert.calledOnce(spy);
        done();
      });

    });

    describe('Signed In', function () {

      beforeEach(module('app.directives', function ($provide) {

        var mockNavToggleSvc,
          mockJwtSvc;

        spy = sinon.spy();

        mockNavToggleSvc = {
          toggleLeftMenu: spy
        };

        mockJwtSvc = {
          getUser: function () {
            return {
              then: function (callback) {
                callback({
                  name: 'Net Citizen'
                });
              }
            };
          }
        };

        $provide.value('NavToggleSvc', mockNavToggleSvc);
        $provide.value('JwtSvc', mockJwtSvc);

      }));

      beforeEach(inject(function (_$rootScope_, $compile) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $compile(element)($scope);
      }));

      it('should show sign out text', function (done) {
        $scope.$apply();
        $scope.isSignedIn().should.be.true;
        expect(element.text()).to.match(/Sign\ Out/);
        done();
      });

      it('should reset user to default on sign out', function(done) {
        $scope.$apply();
        // Use $broadcast for the test, $emit used in app
        $rootScope.$broadcast('user.signout');
        expect($scope.user.name).to.equal('Guest');
        done();
      });

    });

  });

})();
