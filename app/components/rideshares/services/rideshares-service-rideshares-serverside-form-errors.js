(function (module) {
  'use strict';

  module.factory('RidesharesServerSideFormErrorsSvc', RidesharesServerSideFormErrorsSvc);

  function RidesharesServerSideFormErrorsSvc() {

    var serverSideFormErrors = [];

    function addItem(item) {
      if(!R.contains(item, serverSideFormErrors)) {
        serverSideFormErrors.push(item);
      }
    }

    function getItems() {
      return serverSideFormErrors;
    }

    return {
      addItem: addItem,
      getItems: getItems
    };

  }

})(angular.module('rideshares.services'));
