(function () {
  'use strict';

  // App routing
  angular.module('app.routes', [
    'ui.router'
  ])
    .config(function ($stateProvider, $urlRouterProvider) {

      // Default route
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'components/app/templates/app-template-main.html',
          controller: 'MainCtrl',
          controllerAs: 'vm',
          data: {noAuth: true}
        })

        .state('404', {
          url: '/404',
          templateUrl: 'components/app/templates/app-template-404.html',
          data: {noAuth: true}
        })

        .state('error', {
          url: '/error',
          templateUrl: 'components/app/templates/app-template-error.html',
          data: {noAuth: true}
        })

        .state('about', {
          url: '/about',
          templateUrl: 'components/app/templates/app-template-about-us.html',
          controller: function ($scope, rsmConfig) {
            $scope.version = rsmConfig.version;
          },
          data: {noAuth: true}
        })

        .state('privacy', {
          url: '/privacy',
          templateUrl: 'components/app/templates/app-template-privacy-policy.html',
          data: {noAuth: true}
        })

        .state('terms', {
          url: '/terms',
          templateUrl: 'components/app/templates/app-template-terms.html',
          data: {noAuth: true}
        })

        .state('contact', {
          url: '/contact',
          templateUrl: 'components/app/templates/app-template-contact.html',
          data: {noAuth: true}
        });

    })
    .run(function ($rootScope, $window, $location) {

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

        if ($location.port() === 3000) {
          return;
        }

        /**
         * Clean up url tracking params
         * Eg: utm_source=email&utm_medium=mobilecpc&utm_campaign=ads
         *
         * Note: It's best to not link with tracking codes direct to the Angular App.
         * Better to track to a dedicated landing page for tracking campaigns/promos etc.
         * Linking direct to angular with tracking codes will trigger another page load (below code).
         *
         * If the user enters on a URL like:
         * website.com?utm_source=email&utm_medium=mobilecpc&utm_campaign=ads
         * after angular routing it will end up like:
         * http://local.website.com/?utm_source=email&utm_medium=mobilecpc&utm_campaign=ads#!/
         *
         * Subsequent clicks would end up like:
         * website.com/?utm_source=email&utm_medium=mobilecpc&utm_campaign=ads#!/terms
         * or if app params
         * website.com/?utm_source=email&utm_medium=mobilecpc&utm_campaign=ads#!/terms?d=3
         *
         * The following code for the subsequent links after then landing page will reload the page into:
         * website.com/#!/terms
         * or if app params
         * website.com/#!/terms?d=3
         *
         */

        if (fromState.name) {

          var urlParams = /com.*#/.exec($location.absUrl());

          if (urlParams[0] && urlParams[0] !== 'com/#') {

            var toUrl = $location.protocol() + '://' + $location.host() + '/#!' + $location.path();

            var searchObject = $location.search();

            if (Object.keys(searchObject).length !== 0) {
              toUrl = toUrl + '?' + serialize(searchObject);
            }

            event.preventDefault();

            $window.location = toUrl;
          }
        }

      });

      function serialize(obj, prefix) {
        var str = [];
        for (var p in obj) {
          if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + '[' + p + ']' : p,
              v = obj[p];
            str.push(typeof v === 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
          }
        }
        return str.join('&');
      }

    });

})();
