(function (module) {
  'use strict';

  module.factory('RidesharesGetSvc', RidesharesGetSvc);

  function RidesharesGetSvc($q, Restangular) {

    var getLatest = function () {

      var deferred = $q.defer();

      Restangular.one('rideshares').get().then(
        function (res) {
          deferred.resolve(res.rideshares);
        },
        function (err) {
          deferred.reject(err);
        }
      );

      return deferred.promise;

    };

    var getById = function getById(rideshareId) {

      var deferred = $q.defer();

      Restangular.one('rideshares').one(rideshareId).get().then(
        function success(res) {
          deferred.resolve(res);
        },
        function error(err) {
          deferred.reject(err.data.errors);
        }
      );

      return deferred.promise;
    };

    return {
      getLatest: getLatest,
      getById: getById
    };

  }

})(angular.module('rideshares.services'));
