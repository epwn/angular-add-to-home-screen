'use strict';

var gulp = require('gulp');

var plugins = require('gulp-load-plugins')();

gulp.task('clean', function () {
  return gulp.src(['dist/', 'example/js/'], {read: false}).pipe(plugins.clean());
});

gulp.task('scripts', function () {
  return gulp.src('js/**/*.js')
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.concat('angular-add-to-home-screen.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(plugins.size());
});

gulp.task('example', function () {
  return gulp.src(['vendor/**/*.js', 'dist/**/*.js'])
    .pipe(gulp.dest('example/js/'))
    .pipe(plugins.size());
});

gulp.task('connect', plugins.connect.server({
  root: ['example'],
  port: 9001,
  livereload: true
}));

gulp.task('build', ['scripts'], function () {
  gulp.start('example');
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

// Watch
gulp.task('watch', ['connect'], function () {
  // Watch for changes in `app` folder
  gulp.watch([
      'example/*.html',
      'js/**/*.js',
    ], function(event) {
      return gulp.src(event.path)
      .pipe(plugins.connect.reload());
    });

  // Watch .js files
  gulp.watch('js/**/*.js', ['build']);

});