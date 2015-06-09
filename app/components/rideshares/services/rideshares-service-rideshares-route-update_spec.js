(function () {
  'use strict';

  describe('Rideshares Service', function () {

    describe('Rideshares Route Update', function () {

      beforeEach(module('rideshares.services'));

      var RidesharesRouteUpdateSvc,
        testArray;

      beforeEach(function () {
        inject(function (_RidesharesRouteUpdateSvc_) {
          RidesharesRouteUpdateSvc = _RidesharesRouteUpdateSvc_;
          testArray = ['a', 'b', 'c'];
          Array.prototype.move = RidesharesRouteUpdateSvc.routeMove;
        });
      });

      it('should move an array item up one position', function () {
        testArray.move(1, 0);
        testArray.should.eql(['b', 'a', 'c']);
      });

      it('should move an array item down one position', function () {
        testArray.move(1, 2);
        testArray.should.eql(['a', 'c', 'b']);
      });

      it('should move an array item down only if there is an item after it', function () {
        RidesharesRouteUpdateSvc.canMoveDown(testArray, 0).should.be.true;
        RidesharesRouteUpdateSvc.canMoveDown(testArray, 1).should.be.true;
        RidesharesRouteUpdateSvc.canMoveDown(testArray, 2).should.be.false;
        testArray = ['a'];
        RidesharesRouteUpdateSvc.canMoveDown(testArray, 0).should.be.false;
      });

      it('should move an array item up only if there is an item before it', function () {
        RidesharesRouteUpdateSvc.canMoveUp(testArray, 0).should.be.false;
        RidesharesRouteUpdateSvc.canMoveUp(testArray, 1).should.be.true;
        RidesharesRouteUpdateSvc.canMoveUp(testArray, 2).should.be.true;
      });

      it('should remove an array item', function () {
        RidesharesRouteUpdateSvc.remove(testArray, 0);
        testArray.should.eql(['b', 'c']);
      });

      it('should return an array\'s length', function () {
        RidesharesRouteUpdateSvc.routeTotalPlaces(testArray).should.equal(3);
      });

    });

  });

})();
