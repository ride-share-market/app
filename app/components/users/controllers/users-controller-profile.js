(function (module) {
  'use strict';

  module.controller('UsersProfileCtrl', UsersProfileCtrl);

  function UsersProfileCtrl($stateParams) {
    this.userId = $stateParams.id;
  }

})(angular.module('users'));
