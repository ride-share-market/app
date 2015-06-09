(function (module) {
  'use strict';

  module.directive('pickATime', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {

        /**
         * http://amsul.ca/pickadate.js/
         * After the element is added to the DOM trigger the pickadate() method
         * Use timeout here so jQuery can pick up on the next tick
         */
        $timeout(function () {
          $('#' + attributes.id + '_time').pickatime();
        }, 1);

      }
    };

  });

})(angular.module('rideshares.directives'));
