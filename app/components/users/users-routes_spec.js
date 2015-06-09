(function () {
  'use strict';

  describe('Users Routes', function () {

    beforeEach(module('users.routes'));

    var $state;

    beforeEach(inject(function (_$state_) {
      $state = _$state_;
    }));

    it('should return all of the state configs', function (done) {

      var list = $state.get().sort(function (a, b) {
        return (a.name > b.name) - (b.name > a.name);
      });

      list.sort();

      var names = [
        '', // implicit root state
        'signin',
        'signout',
        'welcome',
        'profile'
      ].sort();

      expect(list.map(function (state) {
        return state.name;
      })).to.eql(names);

      done();

    });

  });

})();
