(function () {
  'use strict';

  describe('User Controller Profile', function () {

    var scope;

    beforeEach(module('users'));

    describe('Success', function () {

      beforeEach(inject(function ($rootScope, $controller, $stateParams) {

        scope = $rootScope.$new();

        $stateParams.id = '54354a2e1268cf741d84c3e8';

        $controller('UsersProfileCtrl as profile', {
          $scope: scope
        });

      }));

      it('should add a user profile to the scope', function () {
        expect(scope.profile.userId).to.equal('54354a2e1268cf741d84c3e8');
      });

    });

  });

})();
