(function () {
  'use strict';

  describe('User Controller Welcome', function () {

    var $scope, $location, $window,
      JwtSvc, WelcomeCtrl;

    beforeEach(function () {

      // Load the users module
      module('users');

      // The app does a full page reload when it extracts the JWT token from the URL path.
      // Mock the window object so the test doesn't do a real page reload (breaks the test suite if it does)
      var mockWindow = {
        location: {
          href: '/welcome?jwt=abc123'
        }
      };

      module(function ($provide) {
        $provide.value('$window', mockWindow);
      });

      inject(function ($rootScope, $controller, _$location_, _$window_, _JwtSvc_) {

        $scope = $rootScope.$new();

        $location = _$location_;

        $window = _$window_;

        JwtSvc = _JwtSvc_;

        $location.path('/welcome?jwt=abc123');

        // stub out the JWT Manager promise
        var stubJwtSvc = function () {
          return {
            then: function (successCallback) {
              successCallback('OK');
            }
          };
        };
        sinon.stub(JwtSvc, 'saveJwt', stubJwtSvc);

      });

    });

    it('should save the JWT from the URL query string to local storage then redirect to /', inject(function ($controller) {

      expect($window.location.href).to.equal('/welcome?jwt=abc123');

      WelcomeCtrl = $controller('WelcomeCtrl', {
        $scope: $scope
      });

      expect($window.location.href).to.equal('/');

    }));

  });

})();
