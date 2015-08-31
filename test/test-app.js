'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

function noFilesContent(files, pattern) {

    files.forEach(function (file) {
        assert.noFileContent(file, pattern);
    });
}

describe('swift.framework:app', function () {

    // Placeholders
    var pattern = /(PROJECT-NAME|PROJECT_NAME|ORGANIZATION-ID|ORGANIZATION_NAME|<%=|%>)/;

    describe('with all features enabled', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({
                    skipInstall: true,
                    openXcode: false,
                })
                .withPrompts({
                    projectName: 'F',
                    organizationName: 'example-org',
                    organizationId: 'org.example',
                    cocoapods: true,
                    githubUser: 'gu',
                })
                .on('end', done);
        });

        it('creates Xcode project', function () {

            // Xcode project
            var files = [
                'F.xcodeproj/project.pbxproj',
                'F.xcodeproj/project.xcworkspace/contents.xcworkspacedata',
                // Shared scheme
                'F.xcodeproj/xcshareddata/xcschemes/F.xcscheme',
            ];
            assert.file(files);
            noFilesContent(files, pattern);
        });

        it('creates Framework target', function () {

            // Framework target
            var files = [
                'F/Info.plist',
                'F/F.h',
                'F/F.swift',
            ];
            assert.file(files);
            noFilesContent(files, pattern);
        });

        it('creates UnitTests target', function () {

            // UnitTests target
            var files = [
                'UnitTests/Info.plist',
                'UnitTests/UnitTests.swift',
            ];
            assert.file(files);
            noFilesContent(files, pattern);

        });

        it('creates Example target', function () {

            // UnitTests target
            var files = [
                'Example/Info.plist',
                'Example/AppDelegate.swift',
                'Example/ViewController.swift',
            ];
            assert.file(files);
            noFilesContent(files, pattern);

        });

        it('creates files', function () {
            assert.file(['.travis.yml', 'LICENSE', ]);
        });

        it('creates podsepc', function () {
            assert.file('F.podspec');
            // repo url
            assert.fileContent('F.podspec', 'https://github.com/gu/F.git');
            assert.noFileContent('F.podspec', pattern);
        });

        it('creates Cartfile', function () {
            assert.file('Cartfile.private');
            assert.file('Cartfile.resolved');
        });

        it('creates README', function () {
            assert.file('README.md');
            assert.noFileContent('README.md', pattern);
        });
    });
});
