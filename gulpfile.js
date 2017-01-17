'use strict';

// Packages
var gulp       = require('gulp');
//var Q          = require('q');
var sourcemaps = require('gulp-sourcemaps');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var sass       = require('gulp-sass');
var rename     = require('gulp-rename');
var cssnano    = require('gulp-cssnano');

// Paths
/*var bower = {
	bs4: 'components/bootstrap',
	flv: 'components/fluidvids/',
	sre: 'components/scrollreveal/'
};
*/
var sassOpts = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var dir = {
  src: {
    js:  'src/js/',
    scss: 'src/scss/'
  },
  dist: {
    js: 'dist/js/',
    css: 'dist/css/'
  }
};

// Tasks
/*gulp.task('sync', function () {
  var deferred = Q.defer();

  setTimeout(function () {
    deferred.resolve();
  }, 2000);

  return deferred.promise;
});*/

gulp.task('jsbuild', function () {
  return gulp.src([
  	bower.flv + 'dist/fluidvids.js',
		bower.sre + 'dist/scrollreveal.js',
  	dir.src.js + 'gm.search.js',
  	dir.src.js + 'gm.stickynav.js',
  	dir.src.js + 'main.js'
  	])
    .pipe(sourcemaps.init())
    .pipe(concat('blackpalm.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.js));
});

gulp.task('jsmin', function () {
  return gulp.src(dir.dist.js + 'blackpalm.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.js));
});

// Copy fonts from modules to dist
gulp.task('fonts', function() {
  return gulp.src(
    ['components/font-awesome/fonts/fontawesome-webfont.*']
    )
    .pipe(gulp.dest('assets/dist/fonts/'));
});
//

gulp.task('cssbuild', function () {
  return gulp.src(dir.src.scss + 'blackpalm.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOpts).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dir.dist.css));
});

gulp.task('cssmin', function () {
  return gulp.src(dir.dist.css + 'blackpalm.css')
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
