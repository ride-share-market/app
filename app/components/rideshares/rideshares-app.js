(function () {
  'use strict';

  angular
    .module('rideshares', [
      'rideshares.routes',
      'rideshares.services',
      'rideshares.directives'
    ])
    .config(function configAngularJwt($httpProvider, jwtInterceptorProvider) {

      // Send the JWT with each request
      jwtInterceptorProvider.tokenGetter = function () {
        var injector = angular.injector(['users.services', 'ng']);
        var JwtSvc = injector.get('JwtSvc');
        return JwtSvc.getJwt().then(function getJwtSuccess(token) {
          return token;
        });
      };
      $httpProvider.interceptors.push('jwtInterceptor');

    });

  angular
    .module('rideshares.services', [
      'restangular',
      'angular-jwt',
      'ngMessages'
    ])
    .config(function configRestangular(RestangularProvider) {

      var injector = angular.injector(['ng']);
      var $window = injector.get('$window');

      if ($window.rsmConfig && $window.rsmConfig.api) {
        RestangularProvider.setBaseUrl($window.rsmConfig.api);
      }

      RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json'
      });

    });

  angular
    .module('rideshares.directives', [
      'ngAutocomplete',
      'angularUtils.directives.dirPagination'
    ]);

})();
