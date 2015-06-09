# ride-share-market-app

Ride Share Market AngularJS App

## Install

- `git clone git@github.com:rudijs/ride-share-market-app.git`
- `cd ride-share-market-app && git checkout develop`
- `npm install -g bower bower-update gulp`
- `npm install`
- `bower install`
- `gulp init`
- Update the *config/env/.json* files.

## AngularJS Unit Tests

Karma test runner using Mocha, Sinon and Chai

- Start karma, run tests once and exit.
- `gulp karma-single-run`
- Start karma, run tests, watch for changes, re-run tests.
- `gulp karma`

## Local Development Workflow

- Start local web server.
- `gulp serve`
- Start live watch processes (code linting, server restart, live reload)
- `gulp watch`
- Open Web Browser and enable the [livereload.com](http://livereload.com/extensions/) plugin.

## End-to-End Tests

### Overview

- [Protractor](http://angular.github.io/protractor/#/) is the end-to-end test framework.
- Steps:
1. Generate a valid JWT token for the tests to use
2. Start the web app
3. Start Web Driver
4. Start the Tests

Generate a valid JWT token for the tests to use.

In the command below, you need to use the current (and valid) user_id.txt test fixture from the ride-share-market-api repo.

`ride-share-market-api/test/fixtures/user_id.txt`

- Open a console
- `cd ride-share-market-api`
- `node`
- `var jwtManager = require('./httpd/lib/jwt/jwtManager')`
- `var token = jwtManager.issueToken({name: 'Net Citizen', id: 'xxxx-xxxx-xxxx-xxxx'});`
- `token`
- Create the new file and Copy/Paste the JWT to [test/fixtures/e2e-jwt.txt](test/fixtures/e2e-jwt.txt)

Start the web app

- Console 1:
- `gulp serve`


Start Web Driver

- Note: Currently the e2e tests need to run with Node.js v0.10.3x due to [this issue](https://github.com/angular/protractor/issues/1893)
- Console 2:
- Use Node v0.10.3x
- `nvm install 0.10.31`
- `nvm use 0.10.31`
- `npm install -g protractor`
- `npm install webdriver-manager`
- `webdriver-manager update && webdriver-manager start`

Start the Tests

- Console 3:
- Use Node v0.10.3x
- `nvm use 0.10.31`
- Run all tests.
- `protractor config/protractor.conf.js`
- Run a selected *suite* of tests from the *config/protractor.conf.js* file.
- `protractor config/protractor.conf.js --suite basic`

Gulp task runner (WIP)
- Run all tests.
- `gulp test-e2e`
- Run a selected *suite* of tests from the *config/protractor.conf.js* file.
- `gulp test-e2e --suite app`

## Node Tests

- `gulp test`

## Build

- Cache Angular templates
- Compile CSS and JS scripts
- Prepare production index.html
- `gulp build`

## Deployment

- `gulp build`
- `./docker-build.sh x.x.x`
- `ssh vagrant@192.168.33.10 '~/deploy-node-app.rb rsm-app:x.x.x'`

## Update

- NPM Modules.
- `npm outdated --depth 0`
- Then cherry pick and npm update one by one.
- Bower Modules with [bower-update](https://www.npmjs.com/package/bower-update)
- `bower-update`

## Notes

Development Docker builds:

- `sudo docker build -t rudijs/rsm-app:x.x.x .`
- Run the container locally for testing.
- Interactive with login.
- `sudo docker run -i --name rsm-app -p 3000:3000 -t rudijs/rsm-app:x.x.x /bin/bash`
- Daemon mode.
- `sudo docker run -d --name rsm-app -p 3000:3000 -t rudijs/rsm-app:x.x.x`

Production builds:

- Docker build, tag and push to local private repository.
- `./docker-build x.x.x`

## Mobile Testing
 
In the loc environment use a tool like airdoid.com to send a URL and open a page on Android Chrome.

- Ex: Use and IP address for local mobile devices
- `http://192.168.0.102:3000/#!/welcome?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVGVzdCIsImlhdCI6MTQwOTg4NzM0MH0.90p7HsF59e8qds4F-YQfckMKfy_cA5bcnub6EmZEAQw`
- `http://local.ridesharemarket.com:3000/#!/welcome?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVGVzdCIsImlhdCI6MTQwOTg4NzM0MH0.90p7HsF59e8qds4F-YQfckMKfy_cA5bcnub6EmZEAQw`
