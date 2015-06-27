(function (module) {
  'use strict';

  module
    .controller('RidesharesLatestCtrl', RidesharesLatestCtrl)
    .directive('rsmRidesharesLatest', function () {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'components/rideshares/directives/rideshares-latest/rideshares-directives-rideshares-latest.html',
        controller: 'RidesharesLatestCtrl',
        controllerAs: 'vm',
        link: function (scope, element, attrs, ctrl) {
          ctrl.getLatestRideshares();
        }
      };
    });

  function RidesharesLatestCtrl($q, $mdMedia, RidesharesGetSvc, AppLocalStorageSvc, RidesharesSortSvc) {

    var vm = this;

    vm.ready = false;

    vm.tester = 101;

    // Pagination defaults
    vm.pagination = {
      itemsPerPage: 5,
      current: 1
    };

    vm.getLatestRideshares = function () {

      $q.all([
        RidesharesGetSvc.getLatest(),
        AppLocalStorageSvc.getItem('rsmLatestCurrentPage')
      ])
        .then(
        function (res) {

          // Use local storage current page for pagination or default to page 1.
          vm.pagination.current = res[1] || 1;

          // If total Rideshares decrease the localstorage current page for pagination may be too great.
          // This creates a bug where current page will be blank - no rideshares on page 5 for example.
          // Check that it's not greater than the total number or rideshares, if it is reset to page 1 for pagination
          if (res[1] && (res[0].length < (vm.pagination.current * vm.pagination.itemsPerPage))) {
              vm.pagination.current = 1;
          }

          return RidesharesSortSvc.latest(res[0]).then(function(res) {
            vm.rideshares = res;
          });

        },
        function (err) {
          // Errors from 1st promise
          vm.errors = err.data.errors;
          // TODO: Errors from local storage lookup
        })
        .then(function () {
          vm.ready = true;
        });

    };

    // This is useful if the user paginates several pages into the data, clicks into, then goes back.
    vm.pageChanged = function(newPageNumber) {
      AppLocalStorageSvc.setItem('rsmLatestCurrentPage', newPageNumber);
    };

    vm.isSmall = function() {
      return $mdMedia('gt-sm');
    };

  }

})(angular.module('rideshares.directives'));
