(function (module) {
  'use strict';

  module.factory('RidesharesWebWorkerSvc', RidesharesWebWorkerSvc);

  function RidesharesWebWorkerSvc($q, $window) {

    function sorter(data) {

      var deferred = $q.defer();

      var onmessage = 'onmessage =\
      function(e) {\
        /* Select data */\
        var items = e.data.map(function (item) {\
          return {\
            _id: item._id,\
            origin: item.itinerary.route[0].place,\
            destination: item.itinerary.route[item.itinerary.route.length - 1].place,\
            waypoints: item.itinerary.route.length - 2,\
            updated_at: item.updated_at\
          };\
        });\
        /* Sort data */\
        items.sort(function(a,b) {\
          return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();\
        }).reverse();\
        /* Return data */\
        postMessage(items);\
      }';

      var blob = new Blob(
        [onmessage],
        {type: 'application/javascript'}
      );

      var URL = $window.URL || ($window.webkitURL); // simple polyfill

      $window.URL = URL;

      // Obtain a blob URL reference to our worker 'file'.
      var blobURL = $window.URL.createObjectURL(blob);

      var worker = new Worker(blobURL);

      worker.addEventListener('message', function (e) {
        deferred.resolve(e.data);
        worker.terminate();
      });

      worker.postMessage(data);

      return deferred.promise;
    }

    return {
      sorter: sorter
    };

  }

})(angular.module('rideshares.services'));
