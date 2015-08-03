(function (module) {
  'use strict';

  module.factory('AppTimingSvc', AppTimingSvc);

  function AppTimingSvc() {

    function timing() {

      var start = new Date().getTime();

      return function() {

        var end = new Date().getTime();

        return end - start;

      };
    }

    return {
      timing: timing
    };

  }

})(angular.module('app.services'));
