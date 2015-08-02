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

  function RidesharesLatestCtrl($q, $mdMedia,
                                RidesharesGetSvc, AppLocalStorageSvc, RidesharesSortSvc, RidesharesSortCountrySvc) {

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

          /*
           If localstorage returns pagination page
           and the pagination page is greater than 1
           and there are less items a for a complete paginated page
           reset to page 1
           */
          if (res[1] && res[1] > 1 && res[0].length < vm.pagination.itemsPerPage) {
            vm.pagination.current = 1;
          }

          vm.chartObject = {
            type: 'PieChart',
            displayed: true,
            data: {
              cols: [
                {id: 'country', label: 'Country', type: 'string'},
                {id: 'ridshareCount', label: 'Rideshare Count', type: 'number'}
              ],
              rows: RidesharesSortCountrySvc.googleChartData(res[0])
            },
            options: {
              title: 'Global Rideshare Distribution',
              width: 500,
              height: 350,
              displayExactValues: true
            }
          };

          return RidesharesSortSvc.latest(res[0]).then(function (res) {
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
    vm.pageChanged = function (newPageNumber) {
      AppLocalStorageSvc.setItem('rsmLatestCurrentPage', newPageNumber);
    };

    vm.isSmall = function () {
      return $mdMedia('gt-sm');
    };

  }

})(angular.module('rideshares.directives'));
