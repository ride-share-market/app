(function () {
  'use strict';

  describe('App Directive Work Spinner', function () {

    var scope,
      RequestCounterSvc,
      element = angular.element('<work-spinner>Loading...</work-sp>');

    beforeEach(module('app'));
    beforeEach(module('app.directives'));

    beforeEach(inject(function ($rootScope, $compile, _RequestCounterSvc_) {
      scope = $rootScope.$new();
      $compile(element)(scope);
      RequestCounterSvc = _RequestCounterSvc_;
      scope.$apply();
    }));

    it('should show and hide the work spinner transcluded content', function (done) {

      // hidden work spinner
      expect(angular.element(element).html()).to.match(/aria-hidden="true"\ class="ng-hide"/);

      // http request interceptor - show work spinner
      RequestCounterSvc.request();
      scope.$apply();
      expect(angular.element(element).html()).to.match(/aria-hidden="false"\ class=""/);

      // http response interceptor - hide work spinner
      RequestCounterSvc.response();
      scope.$apply();
      expect(angular.element(element).html()).to.match(/aria-hidden="true"\ class="ng-hide"/);

      done();
    });

  });

})();
