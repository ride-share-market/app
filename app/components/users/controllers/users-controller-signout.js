(function (module) {
  'use strict';

  module.controller('SignOutCtrl', SignOutCtrl);

  function SignOutCtrl($timeout, $location, JwtSvc) {

    JwtSvc.removeJwt().then(function success() {
      $timeout(function () {
        $location.path('/');
      }, 1250);
    });

  }

})(angular.module('users'));
