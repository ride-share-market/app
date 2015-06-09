'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = function (app) {

  app.get('/', function *home() {

    //console.log('req', this.request);
    //console.log('query', this.query);

    var template = (env === 'loc') ? 'index.dev' : 'index.prd';
    yield this.render(template);
  });

  // Custom 404 page
  app.use(function *pageNotFound(next) {
    yield next;

    if (404 !== this.status) {
      return;
    }

    // we need to explicitly set 404 here
    // so that koa doesn't assign 200 on body=
    this.status = 404;

    switch (this.accepts('html', 'json')) {
      case 'html':
        this.type = 'html';
        this.body = '<p>Page Not Found</p>';
        break;
      case 'json':
        this.body = {
          message: 'Page Not Found'
        };
        break;
      default:
        this.type = 'text';
        this.body = 'Page Not Found';
    }
  });

};
