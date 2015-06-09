(function () {
  'use strict';

  /**
   * Route Auth Policy: default all routes require the user to be signed in.
   *
   * Public non-authenticated routes require 'data: { noAuth: true }'
   *
   * This policy will cascade down into other routes in other components
   *
   */
  angular.module('app.routes.auth.policy', ['users'])
    .run(function ($rootScope, $state, JwtSvc) {

      $rootScope.$on('$stateChangeStart', function (event, toState) {

        // if route requires auth and user is not logged in
        if (isAuthRequired(toState)) {

          // redirect back to login
          JwtSvc.getUser().then(function success(user) {
            if (!user) {
              event.preventDefault(); // stop current execution
              $state.go('signin'); // go to login
            }
          });
        }

      });

      // is authentication required for this route
      function isAuthRequired(toState) {
        return (toState.data && toState.data.noAuth) ? false : true;
      }

    });

})();
