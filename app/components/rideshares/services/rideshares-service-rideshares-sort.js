(function (module) {
  'use strict';

  module.factory('RidesharesSortSvc', RidesharesSortSvc);

  function RidesharesSortSvc($q, $window) {

    function latest(data) {

      var R = $window.R;

      var rideshare = function (obj) {
        return {
          _id: obj._id,
          origin: obj.itinerary.route[0].place,
          destination: obj.itinerary.route[obj.itinerary.route.length - 1].place,
          waypoints: obj.itinerary.route.length - 2,
          updated_at: obj.updated_at
        };
      };

      var rideshares = R.compose(R.reverse, R.sortBy(R.prop('updated_at')), R.map(rideshare));

      return $q.when(rideshares(data));

    }

    return {
      latest: latest
    };

  }

})(angular.module('rideshares.services'));
