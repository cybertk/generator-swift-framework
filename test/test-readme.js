/* global describe, before, it */

'use strict'

var path = require('path')
var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test

describe('swift.framework:readme', function () {
  var pattern = /(<%=|%>)/

  describe('with all features enabled', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/readme'))
        .withOptions({
          projectName: 'F',
          githubUser: 'GU'
        })
        .on('end', done)
    })

    it('creates readme', function () {
      assert.file('README.md')
      assert.noFileContent('README.md', pattern)
    })
  })
})
