(function () {
  'use strict';

  describe('App Service Nav Top Links', function () {

    beforeEach(module('app.services'));

    var NavTopLinksSvc;

    beforeEach(function () {
      inject(function (_NavTopLinksSvc_) {
        NavTopLinksSvc = _NavTopLinksSvc_;
      });
    });

    it('should expose main navigation links', function (done) {
      expect(NavTopLinksSvc.urls).to.be.instanceof(Array);
      done();
    });

  });

})();
