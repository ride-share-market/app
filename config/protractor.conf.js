'use strict';

var args   = require('yargs').argv;

// Gulp will set NODE_ENV to 'test' by default.
//var config = require('./app');

var protractorConfig = {

  capabilities: {
    'browserName': 'chrome'
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },

  suites: {
    //smoke: 'spec/smoketests/*.js',
    all: '../test/e2e/**/*.js',
    basic: '../test/e2e/app-basic_spec.js',
    crud: '../test/e2e/rideshares-crud_spec.js'
  }

};

if(args.host === 'local') {
  console.log('==> Testing Local Server');
}
else {
  console.log('==> Testing Remote Server: ' + args.host);
  // TODO: Point tests to remote server using SauceLabs
  //protractorConfig.seleniumAddress: config.get('e2e').seleniumAddress;
}

exports.config = protractorConfig;
