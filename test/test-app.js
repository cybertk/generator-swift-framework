/* global describe, before, it */

'use strict'

var path = require('path')
var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test

assert.noFilesContent = function (files, pattern) {
  files.forEach(function (file) {
    assert.noFileContent(file, pattern)
  })
}

describe('swift.framework:app', function () {
  // Placeholders
  var pattern = /(PROJECT-NAME|PROJECT_NAME|ORGANIZATION-ID|ORGANIZATION_NAME|<%=|%>)/

  describe('with mobileprovision disable', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({
          skipInstall: true,
          openXcode: false
        })
        .withPrompts({
          projectName: 'F',
          organizationName: 'example-org',
          organizationId: 'org.example',
          cocoapods: true,
          githubUser: 'gu',
          travis: true,
          mobileprovision: false
        })
        .on('end', done)
    })

    it('creates Xcode project', function () {
      // Xcode project
      var files = [
        'F.xcodeproj/project.pbxproj',
        'F.xcodeproj/project.xcworkspace/contents.xcworkspacedata',
        'F.xcodeproj/xcshareddata/xcschemes/F.xcscheme',
        'F/Info.plist',
        'F/F.h',
        'F/F.swift',
        'UnitTests/Info.plist',
        'UnitTests/UnitTests.swift',
        'Example/AppDelegate.swift',
        'Example/Assets.xcassets/AppIcon.appiconset/Contents.json',
        'Example/Base.lproj/LaunchScreen.storyboard',
        'Example/Base.lproj/Main.storyboard',
        'Example/Info.plist',
        'Example/ViewController.swift'
      ]

      assert.file(files)
      assert.noFilesContent(files, pattern)
    })

    it('creates gitignore', function () {
      assert.file('.gitignore')
    })

    it('creates license', function () {
      assert.file('LICENSE')
    })

    it('creates readme', function () {
      assert.file('README.md')
    })

    it('creates contributing', function () {
      assert.file('CONTRIBUTING.md')
    })

    it('creates podsepc', function () {
      assert.file('F.podspec')
      // repo url
      assert.fileContent('F.podspec', 'https://github.com/gu/F.git')
      assert.noFileContent('F.podspec', pattern)
    })

    it('creates Cartfile', function () {
      assert.file([
        'Cartfile.private',
        'Cartfile.resolved'
      ])
    })

    it('creates Travis scripts', function () {
      assert.file('.travis.yml')
    })

    it('creates scripts', function () {
      var files = [
        'script/cert',
        'script/README.md',
        'Makefile',
        'Gemfile',
        'Gemfile.lock'
      ]
      assert.file(files)
      assert.noFilesContent(files, pattern)
    })
  })

  describe('with travis disabled', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({
          skipInstall: true,
          openXcode: false
        })
        .withPrompts({
          projectName: 'F',
          organizationName: 'example-org',
          organizationId: 'org.example',
          cocoapods: true,
          githubUser: 'gu',
          travis: false,
          mobileprovision: false
        })
        .on('end', done)
    })

    it('creates Xcode project', function () {
      // Xcode project
      var files = [
        'F.xcodeproj/project.pbxproj',
        'F.xcodeproj/project.xcworkspace/contents.xcworkspacedata',
        'F.xcodeproj/xcshareddata/xcschemes/F.xcscheme',
        'F/Info.plist',
        'F/F.h',
        'F/F.swift',
        'UnitTests/Info.plist',
        'UnitTests/UnitTests.swift',
        'Example/AppDelegate.swift',
        'Example/Assets.xcassets/AppIcon.appiconset/Contents.json',
        'Example/Base.lproj/LaunchScreen.storyboard',
        'Example/Base.lproj/Main.storyboard',
        'Example/Info.plist',
        'Example/ViewController.swift'
      ]

      assert.file(files)
      assert.noFilesContent(files, pattern)
    })

    it('creates gitignore', function () {
      assert.file('.gitignore')
    })

    it('creates license', function () {
      assert.file('LICENSE')
    })

    it('creates readme', function () {
      assert.file('README.md')
    })

    it('creates contributing', function () {
      assert.file('CONTRIBUTING.md')
    })

    it('creates podsepc', function () {
      assert.file('F.podspec')
      // repo url
      assert.fileContent('F.podspec', 'https://github.com/gu/F.git')
      assert.noFileContent('F.podspec', pattern)
    })

    it('creates Cartfile', function () {
      assert.file([
        'Cartfile.private',
        'Cartfile.resolved'
      ])
    })

    it('does not create Travis scripts', function () {
      assert.noFile('.travis.yml')
    })

    it('creates scripts', function () {
      var files = [
        'script/cert',
        'script/README.md',
        'Makefile',
        'Gemfile',
        'Gemfile.lock'
      ]
      assert.file(files)
      assert.noFilesContent(files, pattern)
    })
  })

  describe('with cocoapods disabled', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({
          skipInstall: true,
          openXcode: false
        })
        .withPrompts({
          projectName: 'F',
          organizationName: 'example-org',
          organizationId: 'org.example',
          cocoapods: false,
          githubUser: 'gu',
          travis: true,
          mobileprovision: false
        })
        .on('end', done)
    })

    it('creates Xcode project', function () {
      // Xcode project
      var files = [
        'F.xcodeproj/project.pbxproj',
        'F.xcodeproj/project.xcworkspace/contents.xcworkspacedata',
        'F.xcodeproj/xcshareddata/xcschemes/F.xcscheme',
        'F/Info.plist',
        'F/F.h',
        'F/F.swift',
        'UnitTests/Info.plist',
        'UnitTests/UnitTests.swift',
        'Example/AppDelegate.swift',
        'Example/Assets.xcassets/AppIcon.appiconset/Contents.json',
        'Example/Base.lproj/LaunchScreen.storyboard',
        'Example/Base.lproj/Main.storyboard',
        'Example/Info.plist',
        'Example/ViewController.swift'
      ]

      assert.file(files)
      assert.noFilesContent(files, pattern)
    })

    it('creates gitignore', function () {
      assert.file('.gitignore')
    })

    it('creates license', function () {
      assert.file('LICENSE')
    })

    it('creates readme', function () {
      assert.file('README.md')
    })

    it('creates contributing', function () {
      assert.file('CONTRIBUTING.md')
    })

    it('does not create podsepc', function () {
      assert.noFile('F.podspec')
    })

    it('creates Cartfile', function () {
      assert.file([
        'Cartfile.private',
        'Cartfile.resolved'
      ])
    })

    it('creates Travis scripts', function () {
      assert.file('.travis.yml')
    })

    it('creates scripts', function () {
      var files = [
        'script/cert',
        'script/README.md',
        'Makefile',
        'Gemfile',
        'Gemfile.lock'
      ]
      assert.file(files)
      assert.noFilesContent(files, pattern)
    })
  })
})
