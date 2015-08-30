'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');
var git = require('gulp-git');
var mocha = require('gulp-mocha');

gulp.task('default', ['test']);

gulp.task('test', ['test-unit', 'test-templates']);

gulp.task('test-unit', function () {
    gulp.src('test/*.js')
        .pipe(mocha());
});

gulp.task('test-templates', ['templates'], function () {
    git.status({
        args: '--porcelain --untracked-files=no'
    }, function (err, stdout) {
        if (stdout) {
            throw new Error('templates are dirty, run `gulp templates` before submit');
        }
    });
});

// Revert tempaltes to a noraml Xcode project, which can be opened via Xcode
gulp.task('templates-revert', function () {
    gulp.src('generators/app/templates/**')
        .pipe(replace(/<%= organizationId %>.<% projectName %>/g, 'ORGANIZATION-ID.PROJECT-NAME'))
        .pipe(replace(/<%= projectName %>/g, 'PROJECT_NAME'))
        .pipe(replace(/<%= organizationName %>/g, 'ORGANIZATION_NAME'))
        .pipe(replace(/<%= organizationId %>/g, 'ORGANIZATION-ID'))
        .pipe(gulp.dest('generators/app/templates'));
});

gulp.task('templates', function () {
    // # Xcode replace '_' to '-' for Bundle Identifier
    gulp.src('generators/app/templates/**')
        .pipe(replace(/ORGANIZATION-ID.PROJECT-NAME/g, '<%= organizationId %>.<% projectName %>'))
        .pipe(replace(/PROJECT_NAME/g, '<%= projectName %>'))
        .pipe(replace(/ORGANIZATION_NAME/g, '<%= organizationName %>'))
        .pipe(replace(/ORGANIZATION-ID/g, '<%= organizationId %>'))
        .pipe(gulp.dest('generators/app/templates'));
});
