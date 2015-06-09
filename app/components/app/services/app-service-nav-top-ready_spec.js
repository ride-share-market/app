(function() {
  'use strict';

  describe('App Service Nav Top Ready', function() {

    beforeEach(module('app.services'));

    var NavTopReadySvc;

    beforeEach(function () {
      inject(function (_NavTopReadySvc_) {
        NavTopReadySvc = _NavTopReadySvc_;
      });
    });

    it('should store ready state', function(done) {
      NavTopReadySvc.ready.should.be.false;
      NavTopReadySvc.ready = true;
      NavTopReadySvc.ready.should.be.true;
      done();
    });


  });

})();