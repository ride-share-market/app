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

  function RidesharesUpdateCtrl($q, $location, RidesharesGetSvc, JwtSvc) {

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
          console.log(vm.rideshare.rideshares[0]);
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

    vm.update1 = function updateRideshare () {
      console.log('vm.update');
      console.log('vm.rideshare', vm.rideshare);
    };

    vm.update = function updateRideshare () {

      vm.rideshare.customPUT(vm.rideshare.rideshares[0]).then(
        function () {
          $location.path('/rideshares/' + vm.rideshare.rideshares[0]._id);
        },
        function (error) {

          // TODO: handle update error response
          console.log(error);

//            var validationErrorMessage = {};
//            if (error.data.message) {
//              // auth error, not logged in (nefarious URL tampering to load templates manually)
//              validationErrorMessage.path = 'Error';
//              validationErrorMessage.type = error.data.message;
//              serverSideFormValidationErrors.push(validationErrorMessage);
//            } else {
//              // display serverside validation errors
//              for (var field in error.data) {
//                validationErrorMessage = {};
//                validationErrorMessage.path = error.data[field].path;
//                validationErrorMessage.message = error.data[field].message;
//                serverSideFormValidationErrors.push(validationErrorMessage);
//              }
//            }
//
//            // Update scope formErrors
//            $scope.formValidationErrors = serverSideFormValidationErrors;

        }
      );
    };

    vm.remove = function () {
      vm.rideshare.remove().then(
        function (res) {
          $location.path(res.meta.location);
        },
        function (err) {
          console.log(err);
          //TODO: handle errors in UI
          //$scope.serverSideErrors.push({ path: 'Error', type: 'Sorry, we are unable to remove this rideshare' });
        }
      );
    };

  }


})(angular.module('rideshares.directives'));
