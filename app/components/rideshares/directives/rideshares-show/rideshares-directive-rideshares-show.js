(function (module) {
  'use strict';

  module
    .controller('RidesharesShowCtrl', RidesharesShowCtrl)
    .directive('rsmRidesharesShow', function () {
      return {
        restrict: 'E',
        scope: {
          rideshareId: '@'
        },
        templateUrl: 'components/rideshares/directives/rideshares-show/rideshares-directive-rideshares-show.html',
        controller: 'RidesharesShowCtrl',
        controllerAs: 'vm',
        bindToController: true
      };
    });

  function RidesharesShowCtrl($q, RidesharesGetSvc, JwtSvc) {

    var vm = this;

    init();

    /**
     * Get the rideshare and current user then set view ready
     */
    function init() {
      $q.all([
        RidesharesGetSvc.getById(vm.rideshareId),
        JwtSvc.getUser()
      ]).then(
        function (res) {
          vm.rideshare = res[0].rideshares[0];
          vm.user = res[1];
          if (vm.user && (vm.rideshare.user._id === vm.user.id)) {
            vm.isOwner = true;
          }
        },
        function (err) {
          vm.errors = err;
        }
      )
        .finally(function () {
          vm.ready = true;
        });
    }
  }

})(angular.module('rideshares.directives'));
