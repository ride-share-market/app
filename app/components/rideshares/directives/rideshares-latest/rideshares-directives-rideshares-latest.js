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

    vm.pagination = {
      current: 1
    };

    vm.getLatestRideshares = function () {

      $q.all([
        RidesharesGetSvc.getLatest(),
        AppLocalStorageSvc.getItem('rsmLatestCurrentPage')
      ])
        .then(
        function (res) {

          vm.pagination = {
            current: res[1] || 1
          };

          //vm.rideshares = res[0];
          //return RidesharesSortLatestSvc.sortRideshares(res[0]).then(function(res) {
          //return RidesharesWebWorkerSvc.sorter(res[0]).then(function(res) {
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
      console.log(newPageNumber);
      AppLocalStorageSvc.setItem('rsmLatestCurrentPage', newPageNumber);
    };

    vm.isSmall = function() {
      return $mdMedia('gt-sm');
    };

  }

})(angular.module('rideshares.directives'));
