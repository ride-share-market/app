(function (module) {
  'use strict';

  module
    .controller('RidesharesUpdateCtrl', RidesharesUpdateCtrl)
    .directive('rsmRidesharesUpdate', function () {
      return {
        restrict: 'E',
        scope: {
          rideshareId: '@'
        },
        templateUrl: 'components/rideshares/directives/rideshares-update/rideshares-directive-rideshares-update.html',
        controller: 'RidesharesUpdateCtrl',
        controllerAs: 'vm',
        bindToController: true
      };
    });

  function RidesharesUpdateCtrl($q, $location, RidesharesGetSvc, JwtSvc, RidesharesServerSideFormErrorsSvc) {

    var vm = this;

    // The google place input form value
    vm.place = null;

    // placeDetails is populated by google places (ngAutocomplete) initialized to null
    vm.placeDetails = null;

    // collection of google places/placeDetails
    vm.route = [];

    vm.isRouteValid = true;

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
          vm.rideshare = res[0];
          vm.user = res[1];
          if (vm.user && (vm.rideshare.rideshares[0].user._id === vm.user.id)) {
            vm.isOwner = true;
          }
          vm.route = vm.rideshare.rideshares[0].itinerary.route;
        },
        function (err) {
          vm.errors = err;
        }
      )
        .finally(function () {
          vm.ready = true;
        });
    }

    vm.update = function updateRideshare() {

      var rideshare = {
        _id: vm.rideshare.rideshares[0]._id,
        itinerary: vm.rideshare.rideshares[0].itinerary
      };

      vm.rideshare.customPUT(rideshare).then(
        function () {
          $location.path('/rideshares/' + vm.rideshare.rideshares[0]._id);
        },
        function (err) {
          err.data.errors.forEach(function (item) {
            RidesharesServerSideFormErrorsSvc.addItem(item.title);
          });
        }
      );
    };

    vm.remove = function () {
      vm.rideshare.remove().then(
        function (res) {
          $location.path(res.meta.location);
        },
        function () {
          $location.path('/error');
        }
      );
    };

  }


})(angular.module('rideshares.directives'));
