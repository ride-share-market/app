(function (module) {
  'use strict';

  module.directive('workSpinner', workSpinner);

  function workSpinner(RequestCounterSvc) {

    return {
      restrict: 'EA',
      transclude: true,
      scope: {},
      template: '<ng-transclude ng-show="requestCount"></ng-transclude>',
      link: function (scope) {
        scope.$watch(function () {
          return RequestCounterSvc.getRequestCount();
        }, function (requestCount) {
          scope.requestCount = requestCount;
        });
      }
    };

  }

})(angular.module('app.directives'));
