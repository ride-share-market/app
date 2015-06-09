(function () {
  'use strict';

  angular.element(document).ready(function () {

    // Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') {
      window.location.hash = '#!';
    }

    // Init the app
    angular.bootstrap(document, ['app']);

  });

})();
