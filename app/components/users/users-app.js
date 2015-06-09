(function () {
  'use strict';

  angular.module('users', [
    'users.routes',
    'users.services',
    'users.directives'
  ])
    .config(function configRestangular(RestangularProvider) {

      var injector = angular.injector(['ng']);
      var $window = injector.get('$window');

      if($window.rsmConfig && $window.rsmConfig.api) {
        RestangularProvider.setBaseUrl($window.rsmConfig.api);
      }

      RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json'
      });

    })
    .config(function configAngularJwt($httpProvider, jwtInterceptorProvider) {

      // Send the JWT with each request
      jwtInterceptorProvider.tokenGetter = function () {
        var injector = angular.injector(['users.services', 'ng']);
        var JwtSvc = injector.get('JwtSvc');
        return JwtSvc.getJwt().then(function (token) {
          return token;
        });
      };
      $httpProvider.interceptors.push('jwtInterceptor');
    });

  // Create application services module and define the dependencies
  angular.module('users.services', [
    'LocalForageModule',
    'restangular',
    'angular-jwt'
  ]);

  angular
    .module('users.directives', []);

})();
