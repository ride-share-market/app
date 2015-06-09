(function (module) {
  'use strict';

  module.directive('forminput', forminput );

  function forminput() {
    return {
      restrict: 'A',
      link: link
    };
  }

  function link(scope, element) {
    setupDom(element[0]);
  }

  function setupDom(element) {
    // label
    var label = element.querySelector('label');
    label.classList.add('bold');
    // div
    element.classList.add('element-padding');
  }

})(angular.module('rideshares.directives'));
