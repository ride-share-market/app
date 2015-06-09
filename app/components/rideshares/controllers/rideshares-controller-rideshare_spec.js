(function () {
  'use strict';

  describe('Rideshares Controller', function () {

    describe('Rideshare', function () {

      var scope;

      beforeEach(module('rideshares'));

      beforeEach(inject(function ($rootScope, $controller, $stateParams) {

        scope = $rootScope.$new();

        $stateParams.rideshareId = '54354a2e1268cf741d84c3e8';

        $controller('RidesharesCtrl as vm', {
          $scope: scope
        });

      }));

      it('should add a user profile to the scope', function () {
        expect(scope.vm.rideshareId).to.equal('54354a2e1268cf741d84c3e8');
      });

    });

  });

})();
