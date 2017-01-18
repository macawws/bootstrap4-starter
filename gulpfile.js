'use strict';

//** PACKAGES **//
var fs = require('fs');

var gulp       = require('gulp');
var Q          = require('q');
var sourcemaps = require('gulp-sourcemaps');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var sass       = require('gulp-sass');
var rename     = require('gulp-rename');
var cssnano    = require('gulp-cssnano');


//** PATHS **//

// Package.json Attributes
var json = JSON.parse(fs.readFileSync('./package.json'));

// Node Modules
var mod = {
  jqy: 'node_modules/jquery/',
  thr: 'node_modules/tether/',
  bs4: 'node_modules/bootstrap/',
	faw: 'node_modules/font-awesome/',
	sre: 'node_modules/scrollreveal/'
};

// Gulp Sass Config
var sassOpts = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// Directories
var dir = {
  src: {
    js:    'assets/src/js/',
    scss:  'assets/src/scss/',
    img:   'assets/src/img/',
  },
  dist: {
    js:    'assets/dist/js/',
    fonts: 'assets/dist/fonts/',
    css:   'assets/dist/css/',
    img:   'assets/dist/img/',
  }
};

//** TASKS **//
gulp.task('sync', function () {
  var deferred = Q.defer();

  setTimeout(function () {
    deferred.resolve();
  }, 200);

  return deferred.promise;
});

gulp.task('jsbuild', function () {
  return gulp.src([
      mod.jqy    + 'dist/jquery.slim.js',
		  mod.thr    + 'dist/js/tether.js',
      mod.bs4    + 'dist/js/bootstrap.js',
      mod.sre    + 'dist/scrollreveal.js',
      dir.src.js + 'main.js'
  	])
    .pipe(sourcemaps.init())
    .pipe(concat(json.short_name + '.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.js));
});

gulp.task('jsmin', function () {
  return gulp.src(dir.dist.js + json.short_name + '.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.js));
});

// Copy fonts from modules to dist
gulp.task('fonts', function() {
  return gulp.src(
    [mod.faw + 'fonts/fontawesome-webfont.*']
    )
    .pipe(gulp.dest(dir.dist.fonts));
});
//

gulp.task('cssbuild', function () {
  return gulp.src(dir.src.scss + json.short_name + '.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOpts).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.css));
});

gulp.task('cssmin', function () {
  return gulp.src(dir.dist.css + json.short_name + '.css')
    .pipe(sourcemaps.init())
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.css));
});


//
gulp.task('styles', ['fonts','cssbuild','sync'], function () {
  gulp.start('cssmin');
});

gulp.task('scripts', ['jsbuild','sync'], function () {
  gulp.start('jsmin');
});

///
gulp.task('default', ['scripts', 'styles']);
///
