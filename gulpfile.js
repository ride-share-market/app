(function () {
  'use strict';

  var gulp = require('gulp'),
    taskListing = require('gulp-task-listing'),
    fs = require('fs'),
  // linting
    jshint = require('gulp-jshint'),
  // local dev server and live reload
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
  // build
    execSync = require('child_process').execSync,
    del = require('del'),
    templateCache = require('gulp-angular-templatecache'),
    minifyHTML = require('gulp-minify-html'),
    useref = require('gulp-useref'),
    ngAnnotate = require('gulp-ng-annotate'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    runSequence = require('run-sequence'),
    cdnify = require('gulp-cdnify');

  var nodemonConfig = JSON.parse(fs.readFileSync('./nodemon.json'));

  var jsLintFiles = [
    // config
    'gulpfile.js',
    'config/**/*.js',

    // angular
    'app/**/*.js',
    '!app/bower_components/**/*.js',
    '!app/template-cache/templates.js',

    // node
    'httpd/**/*.js',

    // tests
    'test/**/*.js',
    '!test/coverage/**/*.js',
    '!test/polyfills/**/*.js'

  ];

  var liveReloadFiles = [
    'httpd/views/index.dev.html',
    'app/components/**/*.js',
    'app/components/**/*.html',
    'app/styles/**/*.css',
    'app/template-cache/templates.js'
  ];

  var stylusFiles = [
    'app/components/**/*.styl'
  ];

  gulp.task('default', taskListing);

  gulp.task('help', taskListing);

  gulp.task('init', function () {
    gulp.src('./config/env/example/*')
      .pipe(gulp.dest('./config/env'));
  });

  gulp.task('watch', function () {
    gulp.watch(jsLintFiles, ['lint']);
    gulp.watch(stylusFiles, ['stylus']);
    gulp.watch('app/components/**/*.html', ['build-templatecache']);

    // Livereload
    livereload.listen();
    gulp.watch(liveReloadFiles).on('change', livereload.changed);

  });

  gulp.task('lint', function () {
    gulp.src(jsLintFiles)
      .pipe(jshint('.jshintrc', {fail: true}))
      .pipe(jshint.reporter()); // Console output
  });

  gulp.task('lint-ci', function () {
    gulp.src(jsLintFiles)
      .pipe(jshint('.jshintrc', {fail: true}))
      .pipe(jshint.reporter()) // Console output
      .pipe(jshint.reporter('fail'));
  });

  gulp.task('stylus', function () {

    var stylus = require('gulp-stylus'),
      prefix = require('gulp-autoprefixer');

    gulp.src(stylusFiles)
      .pipe(stylus())
      .pipe(prefix())
      .pipe(gulp.dest('./app/styles'));
  });

  gulp.task('serve', function () {
    nodemon(nodemonConfig)
      .on('restart', function () {
        console.log('Local Dev Server Restarting...');
      });
  });

  gulp.task('karma', function () {
    return execSync('./node_modules/karma/bin/karma start config/karma.conf.js', {stdio: [0, 1, 2]});
  });

  gulp.task('karma-ci', function () {
    var cmd = [
      './node_modules/karma/bin/karma start config/karma.conf.js',
      '--reporters dots',
      '--single-run'
    ].join(' ');
    return execSync(cmd, {stdio: [0, 1, 2]});
  });

  /*
   * Run all node.js tests:
   * gulp test
   *
   * Run selected node.js tests
   * gulp test --suite httpd/routes/routes-default.spec.js
  */
  gulp.task('test', function () {

    var tests = 'httpd/**/*.js';

    if (process.argv[3] === '--suite' && process.argv[4]) {
      tests = process.argv[4];
    }

    var cmd = [
      'NODE_ENV=test',
      'node --harmony ./node_modules/istanbul-harmony/lib/cli.js',
      'cover node_modules/mocha/bin/_mocha',
      '-x \'*spec.js\'',
      '--root httpd/',
      '--dir test/coverage',
      '-- ',
      '-R spec',
      tests
    ].join(' ');

    return execSync(cmd, {stdio: [0, 1, 2]});

  });

  gulp.task('test-ci', function () {

    var cmd = [
      './node_modules/mocha/bin/mocha',
      '--reporter dot',
      'httpd/**/*spec.js'
    ].join(' ');

    return execSync(cmd, {stdio: [0, 1, 2]});

  });

  gulp.task('build-clean', function (cb) {
    del(['dist/'], cb);
  });

  gulp.task('build-clean-templatecache', function (cb) {
    del(['app/template-cache'], cb);
  });

  gulp.task('build-templatecache', function () {
    gulp.src([
      'app/**/*.html',
      '!app/bower_components/**/*.html'
    ])
      .pipe(minifyHTML({
        quotes: true
      }))
      .pipe(templateCache({module: 'app'}))
      .pipe(gulp.dest('app/template-cache'));
  });

  gulp.task('build-copy-images', function () {
    return gulp.src('./app/images/**/*')
      .pipe(gulp.dest('./dist/images'));
  });

  gulp.task('build-copy-favicon', function () {
    return gulp.src('./app/favicon.ico')
      .pipe(gulp.dest('./dist/'));
  });

  gulp.task('build-scripts-styles', function () {
    var assets = useref.assets({searchPath: 'app'});

    return gulp.src('httpd/views/index.dev.html')

      // Concatenate with gulp-useref
      .pipe(assets)

      .pipe(gulpif('*.js', ngAnnotate()))

      // Minify any javascript sources
      .pipe(gulpif('*.js', uglify()))

      // Minify any CSS sources
      .pipe(gulpif('*.css', minifyCss()))

      // Rename the concatenated files
      .pipe(rev())
      .pipe(assets.restore())
      .pipe(useref())

      // Substitute in new filenames
      .pipe(revReplace())
      .pipe(gulp.dest('dist'));
  });

  gulp.task('build-index', function () {
    return execSync('mv ./dist/index.dev.html ./httpd/views/index.prd.html', {stdio: [0, 1, 2]});
  });

  gulp.task('cdnify-index', function () {

    return gulp.src('httpd/views/index.prd.html')
      .pipe(cdnify({
        base: 'https://rsm-154707.c.cdn77.org/'
      }))
      .pipe(gulp.dest('httpd/views'));

  });

  gulp.task('build', function (callback) {
    runSequence(
      'build-clean',
      'build-templatecache',
      'build-scripts-styles',
      // build in parallel
      [
        'build-copy-images',
        'build-copy-favicon'
        //'build-css',
        //'build-js'
      ],
      'build-index',
      callback
    );
  });

  gulp.task('build-prd', function (callback) {
    runSequence(
      'build',
      'cdnify-index',
      callback
    );
  });

  var args = require('yargs').argv;
  var browserSync = require('browser-sync');
  var protractor = require('gulp-protractor').protractor;
  var webdriverUpdate = require('gulp-protractor').webdriver_update;

  function runProtractor() {

    var suite = args.suite || 'all',
      host = args.host || 'local';

    // NOTE: Using the fake './foobar' so as to run the files
    // listed in protractor.conf.js, instead of what was passed to
    // gulp.src
    return gulp.src('./foobar')
      .pipe(protractor({
        configFile: 'config/protractor.conf.js',
        args: [
          '--suite', suite,
          '--host', host
        ]
      }))
      .on('error', function (err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
      })
      .on('end', function () {
        // Close browser sync server
        browserSync.exit();
      });
  }

  gulp.task('test-e2e', ['webdriver-update'], runProtractor);
  gulp.task('webdriver-update', webdriverUpdate);

})();
