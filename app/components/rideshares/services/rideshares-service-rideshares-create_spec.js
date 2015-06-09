(function () {
  'use strict';

  describe('Rideshares Service', function () {

    describe('Rideshares Create', function () {

      //beforeEach(module('rideshares.service.rideshares.create'));
      beforeEach(module('rideshares.services'));

      // Load fixture data
      beforeEach(module('fixture/200-post-rideshare.json'));
      beforeEach(module('fixture/400-post-rideshare.json'));

      var $scope,
        $httpBackend,
        RidesharesCreateSvc;

      beforeEach(inject(function ($rootScope, _$httpBackend_, _RidesharesCreateSvc_) {
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        RidesharesCreateSvc = _RidesharesCreateSvc_;
      }));

      it('should send a POST request OK', function(done) {
        inject(function (fixture200PostRideshare) {

          // test
          $httpBackend.expectPOST('/rideshares').respond(200, fixture200PostRideshare);

          RidesharesCreateSvc.create({
            itinerary: {
              route: ['Here', 'There']
            }
          }).then(function createSuccess(res) {
            expect(res._id).to.equal(fixture200PostRideshare.rideshares[0]._id);
          });

          $httpBackend.flush();

          done();

        });
      });

      it('should handle POST request errors', function(done) {
        inject(function(fixture400PostRideshare) {

          // test
          $httpBackend.expectPOST('/rideshares').respond(400, fixture400PostRideshare);

          RidesharesCreateSvc.create({}).catch(function createError(err) {
            expect(err).to.be.instanceof(Array);
            expect(err[0].code).to.equal('validation_error');
            expect(err[0].title).to.equal('Itinerary is required.');
          });

          $httpBackend.flush();

          done();

        });
      });

    });

  });

})();
