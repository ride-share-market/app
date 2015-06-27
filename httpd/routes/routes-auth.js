'use strict';

var config = require('../../config/app');

module.exports = function (router) {

  router
    .get('/signin/google', function *signinGoogle(next) {
      this.redirect(config.get('oauth').signin.google);
      yield next;
    })
    .get('/signin/facebook', function *signinFacebook(next) {
      this.redirect(config.get('oauth').signin.facebook);
      yield next;
    });

};
