var koa = require('koa'),
  app = koa();

require('./config/koa')(app);

app.listen(3000);
