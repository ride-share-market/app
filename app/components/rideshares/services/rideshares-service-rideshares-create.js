(function(module) {
  'use strict';

  module.factory('RidesharesCreateSvc', RidesharesCreateSvc);

  function RidesharesCreateSvc($q, Restangular) {
    return {
      create: createRideshare($q, Restangular)
    };

  }

  function createRideshare($q, Restangular) {
    return function(rideshare) {

      console.log('posting: ', rideshare);

      var deferred = $q.defer();

      Restangular.all('rideshares').post(rideshare).then(
        function (res) {
          // TODO: save to local storage
          deferred.resolve(res.rideshares[0]);
        },
        function (err) {
          deferred.reject(err.data.errors);
        }
      );

      return deferred.promise;
    };
  }

})(angular.module('rideshares.services'));
