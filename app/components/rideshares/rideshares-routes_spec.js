(function () {
  'use strict';

  describe('Ridehares Routes', function () {

    beforeEach(module('rideshares.routes'));

    var $state;

    beforeEach(inject(function (_$state_) {
      $state = _$state_;
    }));

    it('should return all of the state configs', function () {

      var list = $state.get().sort(function (a, b) {
        return (a.name > b.name) - (b.name > a.name);
      });

      list.sort();

      var names = [
        '', // implicit root state
        'create',
        'show',
        'update'
      ].sort();

      expect(list.map(function (state) {
        return state.name;
      })).to.eql(names);

    });

  });

})();
