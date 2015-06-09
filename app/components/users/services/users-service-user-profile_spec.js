(function() {
  'use strict';

  describe('Users Service User Profile', function () {

    beforeEach(module('users.services'));

    // Load fixture data
    beforeEach(module('fixture/200-get-user-by-id.json'));
    beforeEach(module('fixture/503-service-unavailable.json'));

    var UserProfileSvc,
      $httpBackend,
      $scope;

    beforeEach(function () {
      inject(function ($rootScope, _$httpBackend_, _UserProfileSvc_) {
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        UserProfileSvc = _UserProfileSvc_;
      });
    });

    it('should return a user profile', function (done) {

      inject(function(fixture200GetUserById) {
        $httpBackend.expectGET('/users/54354a2e1268cf741d84c3e8').respond(fixture200GetUserById);

        UserProfileSvc.getProfileById('54354a2e1268cf741d84c3e8').then(function (user) {
          expect(user._id).to.equal('54354a2e1268cf741d84c3e8');
          user.providers.should.be.instanceof(Array);
        });

        $httpBackend.flush();

        done();
      });

    });

    it('should handle errors', function(done) {

      inject(function (fixture503ServiceUnavailable) {

        $httpBackend.expectGET('/users/54354a2e1268cf741d84c3e8').respond(503, fixture503ServiceUnavailable);

        UserProfileSvc.getProfileById('54354a2e1268cf741d84c3e8').then(console.log, function getProfileByIdError(err) {
          expect(err.length).to.equal(1);
          expect(err[0].code).to.equal('service_unavailable');
          expect(err[0].title).to.equal('Service Unavailable.');
        });

        $httpBackend.flush();

        done();

      });

    });

  });

})();
