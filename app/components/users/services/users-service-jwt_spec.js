(function () {
  'use strict';

  describe('Jwt Manager Service', function () {

    var rootScope,
      JwtSvc,
      spies;

    beforeEach(module('users.services', function ($provide) {
      $provide.factory('$localForage', function () {

        var value,
          testUser = {name: 'Test'};

        return {
          setItem: function (key, val) {
            value = val;
            return {
              then: function (cb) {
                cb(value);
              }
            };
          },
          getItem: function () {
            return {
              then: function (cb) {
                cb(value);
                return {
                  then: function(cb) {
                    cb(testUser);
                  }
                };
              }
            };
          },
          removeItem: function () {
            value = undefined;
            testUser = null;
            return {
              then: function (cb) {
                cb(value);
              }
            };
          }

        };
      });
    }));

    beforeEach(inject(function ($rootScope, _JwtSvc_) {
      rootScope = $rootScope;
      JwtSvc = _JwtSvc_;
      spies = {
        signout: sinon.spy(rootScope, '$emit')
      };
    }));

    afterEach(function () {
      if (rootScope.$emit.restore) {
        rootScope.$emit.restore();
      }
    });

    it('should save a JWT Token from a URL', function (done) {

      // Save a jwt via the entire URL
      JwtSvc.saveJwt('http://abc.com?jwt=abc123').then(
        function success(data) {
          data.should.equal('abc123');

          // Save a jwt token direct
          JwtSvc.saveJwt('def456').then(
            function success(data) {
              data.should.equal('def456');
              done();
            });
        });

    });

    it('should get a JWT token', function () {

      JwtSvc.saveJwt('http://abc.com?jwt=abc123').then(
        function success(data) {
          data.should.equal('abc123');

          JwtSvc.getJwt().then(
            function success(data) {
              data.should.equal('abc123');
            });
        });

    });

    describe('remove', function () {

      afterEach(function () {

        // Confirm angular rootScope emit/broadcast
        sinon.assert.calledWith(spies.signout, 'user.signout');
      });

      it('should remove a JWT token', function () {

        return JwtSvc.saveJwt('http://abc.com?jwt=abc123').then(
          function success(data) {
            data.should.equal('abc123');

            return JwtSvc.getJwt().then(
              function success(data) {
                data.should.equal('abc123');

                return JwtSvc.removeJwt().then(function success(data) {
                  expect(data).to.be.undefined;

                  return JwtSvc.getJwt().then(
                    function success(data) {
                      expect(data).to.be.undefined;
                    });
                });
              });
          });

      });

    });

    describe('get user', function () {

      it('should extract the user name from the JWT token', function () {

        var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVGVzdCIsImlhdCI6MTQxMDI1NjAwMH0.Ei41EFuBKsE8igQ1sd1661TKGerNYN3FlndYKltG5RY';

        return JwtSvc.saveJwt(jwt).then(
          function success(data) {
            data.should.equal(jwt);

            return JwtSvc.getUser().then(
              function success(data) {
                data.name.should.equal('Test');
              });
          });

      });

      it('returns null if no JWT in local storage', function () {

        // First make sure no JWT for the getUser() test next
        return JwtSvc.removeJwt().then(function success() {
          return JwtSvc.getUser().then(
            function success(data) {
              expect(data).to.be.null;
            });
        });

      });

    });

  });

})();
