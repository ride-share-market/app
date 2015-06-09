'use strict';

module.exports = function () {

  return {
    // base path, that will be used to resolve files and exclude
    basePath: './',

    frameworks: [
      'mocha',
      'sinon-chai'
    ],

    // list of files / patterns to load in the browser
    files: [
      // Application dependencies
      'app/bower_components/ramda/dist/ramda.js',

      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/angular/angular.min.js',
      'app/bower_components/angular-messages/angular-messages.min.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-aria/angular-aria.js',
      'app/bower_components/angular-material/angular-material.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/localforage/dist/localforage.js',
      'app/bower_components/angular-localforage/dist/angular-localForage.js',
      'app/bower_components/lodash/lodash.js',
      'app/bower_components/restangular/dist/restangular.js',
      'app/bower_components/angular-jwt/dist/angular-jwt.js',
      'app/bower_components/angular-material-icons/angular-material-icons.js',
      'app/bower_components/ngAutocomplete/src/ngAutocomplete.js',
      'app/bower_components/angular-utils-pagination/dirPagination.js',
      'app/bower_components/pickadate/lib/picker.js',
      'app/bower_components/pickadate/lib/picker.date.js',
      'app/bower_components/pickadate/lib/picker.time.js',
      'app/bower_components/angularytics/dist/angularytics.min.js',

      // First load app.js
      'app/components/app/app.js',

      // Components

      // app
      'app/components/app/*.js',
      'app/components/app/**/*.js',
      'app/components/app/**/*.html',

      // users
      'app/components/users/*.js',
      'app/components/users/**/*.js',
      'app/components/users/**/*.html',

      // rideshares
      'app/components/rideshares/*.js',
      'app/components/rideshares/**/*.js',
      'app/components/rideshares/**/*.html',

      'test/fixtures/**/*.json',

      // Inline WebWorker polyfill for PhantomJS.
      // It's likely when Karma supports PhantomJS 2.1 we won't need this.
      'test/polyfills/Blob.js'
    ],

    // list of files to exclude
    exclude: [
      'app/components/app/app-init.js'
    ],

    preprocessors: {

      // test directive HTML template caching
      'app/components/**/*.html': ['ng-html2js'],

      // fixture data
      'test/fixtures/**/*.json': ['ng-json2js'],

      // test Javascript coverage
      // source files, that you want to generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      //'app/services/!(*_spec)+(.js)': ['coverage'],
      'app/components/**/!(*_spec)+(.js)': ['coverage']

    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      moduleName: 'templates',
      stripPrefix: 'app/'
    },

    ngJson2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'test/fixtures/',

      // prepend this to the
      prependPrefix: 'fixture/'
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'test/coverage/'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: 'LOG_INFO',

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false

  };

};
