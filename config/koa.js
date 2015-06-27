'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'loc',
  fs = require('fs'),
  helmet = require('koa-helmet'),
  compress = require('koa-compress'),
  router = require('koa-router')(),
  render = require('koa-ejs'),
  path = require('path'),
  requireWalk = require('require-walk'),
  koaJsonLogger = require('koa-json-logger'),
  //serve = require('koa-static');
  serve = require('koa-static-cache');

var config = require('../config/app');

module.exports = function (app) {

  app.use(helmet.defaults());

  app.use(koaJsonLogger({name: 'rsm-app'}));

  app.use(compress());

  //var assetsPath;
  app.use(serve(path.join(__dirname, (env === 'loc') ? './../app' : './../dist')), {
    maxAge: 365 * 24 * 60 * 60
  });

  // EJS templates
  render(app, {
    root: path.join(__dirname, './../httpd/views'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
  });

  // EJS template variables
  var json = JSON.parse(fs.readFileSync('bower.json', 'utf8'));
  app.use(function* (next) {
    this.state = this.state || {};
    this.state.version = json.version;
    this.state.api = config.get('app').api;
    yield next;
  });

  // Routes
  requireWalk(config.get('root') + '/httpd/routes')(router, app);

  app
    .use(router.routes())
    .use(router.allowedMethods());

};
