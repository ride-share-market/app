(function () {
  'use strict';

  describe('App Directive Nav Side', function () {

    var $rootScope,
      $scope,
      element = angular.element('<rsm-nav-side></rsm-nav-side>');

    // Load the test cached HTML templates
    beforeEach(module('templates'));
    // Dependencies
    beforeEach(module('app.services'));
    beforeEach(module('app.directives'));
    beforeEach(module('users.services'));

    beforeEach(inject(function (_$rootScope_, $compile) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $compile(element)($scope);
    }));

    it('should compile the html template', function (done) {
      $scope.$apply();
      expect(element.text()).to.match(/Home/);
      done();
    });

  });

})();
