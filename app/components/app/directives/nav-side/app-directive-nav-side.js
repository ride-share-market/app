(function (module) {
  'use strict';

  module.directive('rsmNavSide', function (NavTopLinksSvc, NavToggleSvc) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/app/directives/nav-side/app-directive-nav-side.html',
        link: function (scope) {
          scope.links = NavTopLinksSvc.urls;
          scope.toggleLeftMenu = NavToggleSvc.toggleLeftMenu;
        }
      };
    });

})(angular.module('app.directives'));
