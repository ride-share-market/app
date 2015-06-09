(function () {
  'use strict';

  describe('URL Inspector Service', function () {

    beforeEach(module('users.services'));

    var UrlInspectorSvc;

    beforeEach(function () {
      inject(function (_UrlInspectorSvc_) {
        UrlInspectorSvc = _UrlInspectorSvc_;
      });
    });

    it('should return false', function () {
      expect(UrlInspectorSvc.checkJwt('abc')).to.be.undefined;
    });

    it('should return jwt token from URL', function () {
      expect(UrlInspectorSvc.checkJwt('http://abc.com/?jwt=123456')).to.equal('123456');
    });

  });

})();