(function (module) {
  'use strict';

  module
    .controller('RidesharesItineraryCtrl', RidesharesItineraryCtrl)
    .directive('rsmRidesharesItinerary', function () {
      return {
        restrict: 'E',
        scope: {
          itinerary: '=',
          isRouteValid: '=?',
          onSave: '&',
          isOwner: '=?',
          onRemove: '&?'
        },
        templateUrl: 'components/rideshares/directives/rideshares-itinerary/rideshares-directives-rideshares-itinerary.html',
        controller: 'RidesharesItineraryCtrl',
        controllerAs: 'vm',
        bindToController: true
      };
    });

  function RidesharesItineraryCtrl($scope, $mdDialog, $mdMedia,
                                   RidesharesRouteUpdateSvc,
                                   RidesharesServerSideFormErrorsSvc,
                                   RidesharesItinerarySvc) {

    var vm = this;

    vm.itinerary = RidesharesItinerarySvc.itinerary(vm.itinerary);

    vm.io = RidesharesItinerarySvc.itineraryOptions;

    // We want to only use the exact input value from a google place lookup
    // If the user alters the google place (vm.place) selection in the UI place form input
    // this watch will set placeDetails to null which will disable the Add place button in the UI.
    $scope.$watch(
      function (scope) {
        return scope.vm.place;
      },
      function (newValue, oldValue) {
        if (vm.placeDetails) {
          if (newValue !== oldValue) {
            vm.placeDetails = null;
          }
        }
      });

    $scope.$watch(RidesharesServerSideFormErrorsSvc.getItems, function (newVal) {
      vm.serverSideFormErrors = newVal;
    }, true);

    vm.addPlace = function () {

      // check we have text in the form input and google place autocomplete
      // TODO: check place and placeDetails have some similar words to avoid user manual mismatching (Array.every|some test)
      if (!vm.place || !vm.placeDetails) {
        return;
      }

      /**
       * place is the human readable place name/title the user selected from Google Places
       * details is an object of place data from Google Places
       *
       * @type {{place: string, details: ()}}
       */
      var location = {
        place: vm.place,
        details: vm.placeDetails
      };

      vm.itinerary.route.push(location);

      // reset google place
      vm.place = '';
      vm.placeDetails = null;

    };

    // Enable Array to move an element up or down in position
    // Used with arrow up/down icons to move a route place's position
    Array.prototype.move = RidesharesRouteUpdateSvc.routeMove;

    vm.routeRemove = RidesharesRouteUpdateSvc.remove;

    // Call the onSave callback
    vm.save = function () {
      vm.onSave();
    };

    vm.confirmRemove = function (ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        // TODO: .parent throwing error?
        //.parent(angular.element(document.body))
        .title('Please confirm...')
        .content('Would you like to remove this Rideshare?')
        .ariaLabel('Confirm Rideshare Remove')
        .ok('Yes, please remove.')
        .cancel('No.')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function () {
        vm.onRemove();
      });
    };

    vm.isSmall = function () {
      return $mdMedia('gt-sm');
    };

  }

})(angular.module('rideshares.directives'));
