'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('swift.framework:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({
                skipInstall: true
            })
            .withPrompts({
                projectName: 'example',
                organizationName: 'example-org',
                organizationId: 'org.example'
            })
            .on('end', done);
    });

    it('creates Xcode project', function () {
        // Xcode project
        assert.file([
            'example.xcodeproj/project.pbxproj',
            'example.xcodeproj/project.xcworkspace/contents.xcworkspacedata',
        ]);

        // Framework target
        assert.file([
            'example/Info.plist',
            'example/example.h',
        ]);

        // UnitTests target
        assert.file([
            'UnitTests/Info.plist',
            'UnitTests/UnitTests.swift',
        ]);
    });

    it('creates files', function () {
        assert.file([
            '.travis.yml',
            'LICENSE',
        ]);
    });
});
