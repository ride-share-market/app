(function () {
  'use strict';

  describe('Users Controller Sign Out', function () {

    var $scope, $timeout, $location,
      JwtSvc, SignOutCtrl;

    beforeEach(module('users'));

    beforeEach(inject(function ($rootScope, _$timeout_, _$location_, _JwtSvc_) {

      $scope = $rootScope.$new();

      $timeout = _$timeout_;

      $location = _$location_;

      $location.path('/signout');

      JwtSvc = _JwtSvc_;

      // stub out the JWT Manager promise
      var stubJwtSvc = function () {
        return {
          then: function (successCallback) {
            successCallback('OK');
          }
        };
      };
      sinon.stub(JwtSvc, 'removeJwt', stubJwtSvc);

    }));

    it('should remove the JWT from local storage then redirect to /', inject(function ($controller) {

      expect($location.path()).to.equal('/signout');

      SignOutCtrl = $controller('SignOutCtrl', {
        $scope: $scope
      });

      $timeout.flush();

      expect($location.path()).to.equal('/');

    }));

  });

})();
