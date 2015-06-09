(function () {
  'use strict';

  describe('App Routes Auth Policy', function () {

    var $rootScope,
      $scope,
      $state,
      JwtSvc,
      spy;

    beforeEach(module('app.routes.auth.policy'));

    beforeEach(inject(function (_$rootScope_, _$state_) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $state = _$state_;
      spy = sinon.spy($state, 'go');
    }));

    describe('Default Policy', function () {

      describe('Non Authenticated User', function () {

        beforeEach(inject(function (_JwtSvc_) {
          JwtSvc = _JwtSvc_;

          // stub out the JWT Manager promise
          var stubJwtSvc = function () {
            return {
              then: function (successCallback) {
                successCallback();
              }
            };
          };
          sinon.stub(JwtSvc, 'getUser', stubJwtSvc);

        }));

        it('should redirect to /signin', function () {

          var toState = {
            url: '/rideshares/create'
          };

          $rootScope.$broadcast('$stateChangeStart', toState);

          sinon.assert.calledOnce(spy);
          sinon.assert.calledWith(spy, 'signin');

        });

      });

      describe('Authenticated User', function () {

        beforeEach(inject(function(_JwtSvc_) {
          JwtSvc = _JwtSvc_;

          // stub out the JWT Manager promise
          var stubJwtSvc = function () {
            return {
              then: function (successCallback) {
                successCallback({_id: 'abc123', email: 'net@citizen.com'});
              }
            };
          };
          sinon.stub(JwtSvc, 'getUser', stubJwtSvc);

        }));

        it('should not redirect to /signin', function () {

          var toState = {
            url: '/rideshares/create'
          };

          $rootScope.$broadcast('$stateChangeStart', toState);

          sinon.assert.notCalled(spy);

        });

      });

    });

  });

})();
