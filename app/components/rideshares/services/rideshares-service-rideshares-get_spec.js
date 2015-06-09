(function () {
  'use strict';

  describe('Rideshares Service', function () {

    describe('Rideshares Get', function () {

      //beforeEach(module('rideshares.service.rideshares.get'));
      beforeEach(module('rideshares.services'));

      // Load fixture data
      beforeEach(module('fixture/200-get-rideshare.json'));
      beforeEach(module('fixture/200-get-rideshares.json'));
      beforeEach(module('fixture/404-get-rideshare.json'));
      beforeEach(module('fixture/503-service-unavailable.json'));

      var RidesharesGetSvc,
        $httpBackend,
        $scope;

      beforeEach(function () {
        inject(function ($rootScope, _$httpBackend_, _RidesharesGetSvc_) {
          $scope = $rootScope.$new();
          $httpBackend = _$httpBackend_;
          RidesharesGetSvc = _RidesharesGetSvc_;
        });
      });

      describe('Get Latest', function () {

        it('should return an array of Rideshares', function(done) {
          inject(function (fixture200GetRideshares) {

            $httpBackend.expectGET('/rideshares').respond(fixture200GetRideshares);

            RidesharesGetSvc.getLatest().then(function (res) {
              expect(res).to.be.instanceof(Array);
              expect(res[0]._id).to.be.a('string');
            });

            $httpBackend.flush();

            done();

          });
        });

        it('should handle errors', function(done) {
          inject(function (fixture503ServiceUnavailable) {

            $httpBackend.expectGET('/rideshares').respond(503, fixture503ServiceUnavailable);

            RidesharesGetSvc.getLatest().then(console.log, function getLatestError(err) {
              expect(err.data.errors).to.be.instanceof(Array);
              expect(err.data.errors[0].code).to.equal('service_unavailable');
              expect(err.data.errors[0].title).to.equal('Service Unavailable.');
            });

            $httpBackend.flush();

            done();

          });
        });

      });

      describe('Get By ID', function () {

        it('should return an array of one Rideshare', function(done) {
          inject(function (fixture200GetRideshare) {

            $httpBackend.expectGET('/rideshares/54449e5b5a2982eab34eb8e6').respond(fixture200GetRideshare);

            RidesharesGetSvc.getById('54449e5b5a2982eab34eb8e6').then(function getByIdSuccess(res) {
              expect(res.rideshares).to.be.instanceof(Array);
              expect(res.rideshares[0]._id).to.be.a('string');
              expect(res.rideshares[0].itinerary.route).to.be.instanceof(Array);
            });

            $httpBackend.flush();

            done();

          });
        });

        it('should return 404 when Rideshare not found', function(done) {
          inject(function (fixture404GetRideshare) {

            $httpBackend.expectGET('/rideshares/54449e5b5a2982eab34eb8e6').respond(404, fixture404GetRideshare);

            RidesharesGetSvc.getById('54449e5b5a2982eab34eb8e6').catch(function getByIdError(err) {
              expect(err).to.be.instanceof(Array);
              expect(err.length).to.equal(1);

            });

            $httpBackend.flush();

            done();

          });
        });

      });

    });

  });

})();
