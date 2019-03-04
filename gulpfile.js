const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('dev', (() => {
    return shell.task([
        'nodemon ./index'
      ]);
  })());