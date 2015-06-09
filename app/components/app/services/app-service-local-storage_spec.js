(function () {
  'use strict';

  describe('App Service Local Storage', function () {

    beforeEach(module('app.services', function ($provide) {
      $provide.factory('$localForage', function () {
        return {
          setItem: function () {
            return {
              then: function (cb) {
                cb(true);
              }
            };
          },
          getItem: function () {
            return {
              then: function (cb) {
                cb('itemValue');
              }
            };
          }
        };
      });
    }));

    var scope,
      AppLocalStorageSvc;

    beforeEach(function () {
      inject(function ($rootScope, _AppLocalStorageSvc_) {
        scope = $rootScope.$new();
        AppLocalStorageSvc = _AppLocalStorageSvc_;
      });
    });

    it('should save a key/value via localForage', function (done) {

      AppLocalStorageSvc.setItem('myKey', 'myValue')
        .then(function (res) {
          res.should.be.true;
          done();
        });

    });

    it('should get key/value via localForage', function (done) {

      AppLocalStorageSvc.getItem('myKey')
        .then(function (res) {
          res.should.equal('itemValue');
          done();
        });

    });

  });

})();
