(function () {
  'use strict';

  describe('App Service Nav Toggle', function () {

    beforeEach(module('app.services'));

    var NavToggleSvc,
      spy = sinon.spy();

    beforeEach(module(function ($provide) {
      $provide.value('$mdSidenav', function () {
        return {
          toggle: spy
        };
      });
    }));

    beforeEach(function () {
      inject(function (_NavToggleSvc_) {
        NavToggleSvc = _NavToggleSvc_;
      });
    });

    it('should expose a left menu toggle method', function (done) {
      expect(NavToggleSvc).to.respondTo('toggleLeftMenu');

      NavToggleSvc.toggleLeftMenu();
      sinon.assert.calledOnce(spy);

      done();
    });

  });
})();
