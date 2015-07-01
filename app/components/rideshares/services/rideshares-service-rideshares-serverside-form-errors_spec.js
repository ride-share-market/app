(function () {
  'use strict';

  describe('Rideshares Service', function () {

    describe('Rideshares Server Side Errors', function () {

      beforeEach(module('rideshares.services'));

      var $scope,
        RidesharesServerSideFormErrorsSvc;

      beforeEach(inject(function ($rootScope, _RidesharesServerSideFormErrorsSvc_) {
        $scope = $rootScope.$new();
        RidesharesServerSideFormErrorsSvc = _RidesharesServerSideFormErrorsSvc_;
      }));

      it('should add non-existing items and return items list', function () {
        var item = {id: 101};
        RidesharesServerSideFormErrorsSvc.getItems().should.eql([]);
        RidesharesServerSideFormErrorsSvc.addItem(item);
        RidesharesServerSideFormErrorsSvc.addItem(item);
        RidesharesServerSideFormErrorsSvc.getItems().should.eql([item]);
      });

    });

  });

})();
