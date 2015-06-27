'use strict';

var http = require('http'),
  request = require('supertest'),
  should = require('chai').should(),
  koa = require('koa'),
  router = require('koa-router')(),
  app = koa();

// Templating stub
app.context.render = function *() {
  /*jshint noyield:true */
  this.type = 'html';
  this.body = 'Rendered OK';
};

// routes to test
require('./routes-default')(router, app);

//enable routing
app
  .use(router.routes())
  .use(router.allowedMethods());

var server = http.createServer(app.callback());

describe('Default Routes', function () {

  describe('GET /', function () {

    it('should return 200', function (done) {
        request(server)
          .get('/')
          .expect(200)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            should.exist(res.text);
            res.text.should.equal('Rendered OK');
            done();
          });
      });

  });

  describe('404', function () {

    it('should return 404 HTML', function (done) {
      request(server)
        .get('/not/found')
        .expect(404)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.text.should.equal('<p>Page Not Found</p>');
          done();
        });
    });

    it('should return 404 JSON', function (done) {

      request(server)
        .get('/not/found')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.text.should.equal('{"message":"Page Not Found"}');
          done();
        });
    });

    it('should return 404 JSON', function (done) {

      request(server)
        .get('/not/found')
        .set('Accept', 'text/plain')
        .expect(404)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          res.text.should.equal('Page Not Found');
          done();
        });
    });

  });

});
