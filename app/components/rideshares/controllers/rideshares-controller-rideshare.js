(function (module) {
  'use strict';

  module.controller('RidesharesCtrl', RidesharesCtrl);

  function RidesharesCtrl($stateParams) {
    this.rideshareId = $stateParams.rideshareId;
  }

})(angular.module('rideshares'));
