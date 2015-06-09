(function (module) {
  'use strict';

  module.factory('AppLocalStorageSvc', AppLocalStorageSvc);

  function AppLocalStorageSvc($localForage) {

    function setItem(key, value) {
      return $localForage.setItem(key, value);
    }

    function getItem(key) {
      return $localForage.getItem(key);
    }

    return {
      setItem: setItem,
      getItem: getItem
    };

  }

})(angular.module('app.services'));
