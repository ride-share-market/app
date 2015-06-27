'use strict';

var config = require('../../config/app'),
  http = require('http'),
  request = require('supertest'),
  should = require('chai').should(),
  koa = require('koa'),
  router = require('koa-router')(),
  app = koa();

//routes to test
require('./routes-auth')(router);

//enable routing
app
  .use(router.routes())
  .use(router.allowedMethods());

var server = http.createServer(app.callback());

describe('Auth Routes', function () {

  describe('GET /signin/google', function () {

    it('should return 302', function (done) {
      request(server)
        .get('/signin/google')
        .expect(302)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          should.exist(res.headers.location);
          res.headers.location.should.equal(config.get('oauth').signin.google);
          done();
        });
    });

  });

});
