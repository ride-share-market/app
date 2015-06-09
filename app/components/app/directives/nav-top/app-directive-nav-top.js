(function (module) {
  'use strict';

  module.directive('rsmNavTop', function (NavTopLinksSvc, NavToggleSvc) {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/app/directives/nav-top/app-directive-nav-top.html',
        link: function (scope) {
          scope.links = NavTopLinksSvc.urls;
          scope.toggleLeftMenu = NavToggleSvc.toggleLeftMenu;
        }
      };
    });

})(angular.module('app.directives'));
