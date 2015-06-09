(function (module) {
  'use strict';

  module.factory('UserProfileSvc', UserProfileSvc);

  function UserProfileSvc($q, Restangular) {

    var getProfileById = function getProfileById(userId) {

      var deferred = $q.defer();

      // TODO: restrict data fetched (ie. do not transmit email address)

      Restangular.one('users').one(userId).get().then(
        function success(res) {
          deferred.resolve(res.users);
        },
        function error(err) {
          deferred.reject(err.data.errors);
        }
      );

      return deferred.promise;
    };

    return {
      getProfileById: getProfileById
    };

  }

})(angular.module('users.services'));
