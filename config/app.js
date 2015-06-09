'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev',
  path = require('path'),
  nconf = require('nconf');

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
nconf.argv()
  .env()
  .file({file: __dirname + '/env/' + env + '.json'});

nconf.defaults({

  root: path.normalize(__dirname + '/..'),

  app: {
    name: 'Ride Share Market APP',
    protocol: 'https://',
    hostname: 'ridesharemarket.com'
  },

  oauth: {
    signin: {
      google: 'https://api.ridesharemarket.com/signin/google'
    }
  },

  // End-to-End test URLs.
  // Local
  // test = local host work station
  // development = local virtual machine
  // Remote with Sauce Labs
  // staging, qa and production are remote and need a real hostname
  e2e: {
    url: {
      test: 'http://local.ridesharemarket.com:3000',
      dev: 'http://dev.ridesharemarket.com',
      stg: 'http://staging.ridesharemarket.com',
      qas: 'http://qa.ridesharemarket.com',
      prd: 'http://ridesharemarket.com'
    },

    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Sauce Labs
    sauceUser: 'your-sauce-labs-username',
    sauceKey: 'your-sauce-labs-key'
  }

});

module.exports = nconf;
