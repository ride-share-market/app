'use strict';

var config = require('../../config/app'),
  http = require('http'),
  request = require('supertest'),
  should = require('chai').should(),
  router = require('koa-router'),
  koa = require('koa'),
  app = koa();

app.use(router(app));

require('./routes-auth')(app);

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
