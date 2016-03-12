'use strict'

var gulp = require('gulp')
var mocha = require('gulp-mocha')
var standard = require('gulp-standard')

gulp.task('default', ['test'])

gulp.task('test', ['test-lint', 'test-unit'])

gulp.task('test-lint', function () {
  return gulp.src(['gulpfile.js', 'generators/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', { breakOnError: true }))
})

gulp.task('test-unit', function () {
  gulp.src('test/*.js')
    .pipe(mocha())
})
