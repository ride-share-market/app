(function () {
  'use strict';

  angular.module('app', [
    'ngMdIcons',
    'angularytics',
    'app.routes.auth.policy',
    'app.routes',
    'app.filters',
    'app.directives',
    'app.services',
    'app.components'
  ])
    .config(function ($locationProvider) {
      // Enable HTML5 Location Mode
      $locationProvider.hashPrefix('!');
    })
    .constant('rsmConfig', {
      version: (function () {
        var injector = angular.injector(['ng']),
          $window = injector.get('$window');
        return ($window.rsmConfig && $window.rsmConfig.version) ? $window.rsmConfig.version : 'latest';
      })()
    })
    .config(function(AngularyticsProvider) {
      var angularyticsEventHandlers = [];
      if (window.location.href.match(/local/)) {
        angularyticsEventHandlers.push('Console');
      }
      else {
        angularyticsEventHandlers.push('GoogleUniversal');
      }
      AngularyticsProvider.setEventHandlers(angularyticsEventHandlers);
      //AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
    }).run(function(Angularytics) {
      Angularytics.init();
    });

  // Create application services module and define the dependencies
  angular.module('app.services', [
    'ngMaterial',
    'LocalForageModule'
  ])
    .config(function ($localForageProvider) {
      $localForageProvider.config({
        storeName: 'data', // name of the table
        description: 'RSM Data Local Storage'
      });
    });

  angular.module('app.directives', []);

  angular.module('app.filters', []);

  angular.module('app.components', [
    'users',
    'rideshares'
  ]);

})();
