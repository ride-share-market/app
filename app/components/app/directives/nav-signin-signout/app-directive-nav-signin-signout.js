(function (module) {
  'use strict';

  module.directive('rsmNavSigninSignout', function (JwtSvc, NavToggleSvc) {
      return {
        restrict: 'E',
        templateUrl: 'components/app/directives/nav-signin-signout/app-directive-nav-signin-signout.html',
        link: function(scope, element, attrs) {

          var defaultUser = {name: 'Guest'};

          scope.user = defaultUser;

          scope.isSignedIn = function () {
            return (scope.user.name !== defaultUser.name) ? true : false;
          };

          JwtSvc.getUser().then(function (user) {
            if (user) {
              scope.user = user;
            }
          });

          // JwtSvc will $emit 'user.signout' on the rootScope on user sign out
          // Reset the user which will reset the navigations to non-logged in.
          scope.$parent.$on('user.signout', function () {
            scope.user = defaultUser;
          });

          scope.toggleLeftMenuOnSign = function () {
             // Only toggle left side menu if clicked from nav side (ie. not from nav top)
            if (attrs.toggleNavSide) {
              NavToggleSvc.toggleLeftMenu();
            }
          };

          scope.isNavSide = function() {
            return (attrs.toggleNavSide) ? true : false;
          };

        }

      };
    });

})(angular.module('app.directives'));
