(function(module) {
  'use strict';

  module
    .controller('RidesharesNewCtrl', RidesharesNewCtrl)
    .directive('rsmRidesharesNew', function () {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/rideshares/directives/rideshares-new/rideshares-directives-rideshares-new.html',
        controller: 'RidesharesNewCtrl',
        controllerAs: 'vm',
        bindToController: true
      };
    });

  function RidesharesNewCtrl($location, RidesharesItinerarySvc, RidesharesCreateSvc, RidesharesServerSideFormErrorsSvc) {

    var vm = this;

    // ready would be false if fetching a existing rideshare, this is a new rideshare so ready is good to go
    vm.ready = true;

    vm.rideshare = {
      itinerary: RidesharesItinerarySvc.itinerary()
    };

    vm.isRouteValid = true;

    vm.create = function () {

      // TODO: do we need this?
      //if (!vm.isRouteValid) {
      //  console.log('oops! bad route');
      //  return;
      //}

      RidesharesCreateSvc.create(vm.rideshare).then(
        function (res) {
          $location.path('/rideshares/' + res._id);
        },
        function (err) {
          err.forEach(function (item) {
            RidesharesServerSideFormErrorsSvc.addItem(item.title);
          });
        }
      );
    };

  }

})(angular.module('rideshares.directives'));
