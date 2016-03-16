/* global describe, before, it */

'use strict'

var path = require('path')
var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test

describe('swift.framework:cocoapods', function () {
  var pattern = /(<%=|%>)/

  describe('with all features enabled', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/cocoapods'))
        .withOptions({
          projectName: 'F',
          githubUser: 'GU'
        })
        .on('end', done)
    })

    it('creates cocoapods', function () {
      assert.file('F.podspec')
      assert.noFileContent('F.podspec', pattern)
    })
  })
})
