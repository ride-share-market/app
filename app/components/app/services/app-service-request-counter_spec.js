(function () {
  'use strict';

  describe('App Service Request Counter', function () {

    beforeEach(module('app'));

    var RequestCounterSvc;

    beforeEach(function () {
      inject(function (_RequestCounterSvc_) {
        RequestCounterSvc = _RequestCounterSvc_;
      });
    });

    it('should count request -> response', function (done) {

      RequestCounterSvc.getRequestCount().should.equal(0);

      // request -> response
      RequestCounterSvc.request().should.be.instanceof(Object);
      RequestCounterSvc.getRequestCount().should.equal(1);
      RequestCounterSvc.response().should.be.instanceof(Object);
      RequestCounterSvc.getRequestCount().should.equal(0);

      done();
    });

    it('should count request -> responseError', function (done) {

      RequestCounterSvc.getRequestCount().should.equal(0);

      // request -> responseError
      RequestCounterSvc.request().should.be.instanceof(Object);
      RequestCounterSvc.getRequestCount().should.equal(1);
      RequestCounterSvc.responseError().should.be.instanceof(Object);
      RequestCounterSvc.getRequestCount().should.equal(0);

      done();
    });


    it('should count request -> requestError', function (done) {

      RequestCounterSvc.getRequestCount().should.equal(0);

      // request -> requestError
      RequestCounterSvc.request().should.be.instanceof(Object);
      RequestCounterSvc.getRequestCount().should.equal(1);
      RequestCounterSvc.requestError().should.be.instanceof(Object);
      RequestCounterSvc.getRequestCount().should.equal(0);

      done();
    });


  });

})();
