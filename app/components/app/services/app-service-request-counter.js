(function (module) {
  'use strict';

  module.factory('RequestCounterSvc', RequestCounterSvc);

  module.config(function ($httpProvider) {
    $httpProvider.interceptors.push('RequestCounterSvc');
  });

  function RequestCounterSvc($q) {

    var requests = 0;

    var request = function (config) {
      requests += 1;
      return $q.when(config);
    };

    var response = function (response) {
      requests -= 1;
      return $q.when(response);
    };

    var requestError = function (error) {
      requests -= 1;
      return $q.reject(error);
    };

    var responseError = function (error) {
      requests -= 1;
      return $q.reject(error);
    };

    var getRequestCount = function () {
      return requests;
    };

    return {
      request: request,
      response: response,
      requestError: requestError,
      responseError: responseError,
      getRequestCount: getRequestCount
    };

  }

})(angular.module('app'));
