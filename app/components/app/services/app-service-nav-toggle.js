(function (module) {
  'use strict';

  module.factory('NavToggleSvc', NavToggleSvc);

  function NavToggleSvc($mdSidenav) {

    function toggleLeftMenu() {
        $mdSidenav('left').toggle();
    }

    return {
      toggleLeftMenu: toggleLeftMenu
    };
  }

})(angular.module('app.services'));
