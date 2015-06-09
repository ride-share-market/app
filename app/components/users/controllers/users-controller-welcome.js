(function (module) {
  'use strict';

  module.controller('WelcomeCtrl', WelcomeCtrl);

  function WelcomeCtrl($location, $window, UrlInspectorSvc, JwtSvc) {

    var jwtUrlToken = UrlInspectorSvc.checkJwt($location.absUrl());

    if (jwtUrlToken) {
      JwtSvc.saveJwt(jwtUrlToken).then(function success() {
        $window.location.href = '/';
      });
    }

  }

})(angular.module('users'));
