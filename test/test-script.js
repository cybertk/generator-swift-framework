/* global describe, before, it */

'use strict'

var path = require('path')
var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test

describe('swift.framework:script', function () {
  var pattern = /(<%=|%>)/

  describe('with all features enabled', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/script'))
        .withOptions({
          projectName: 'F'
        })
        .on('end', done)
    })

    it('creates Makefile', function () {
      assert.file('Makefile')
      assert.noFileContent('Makefile', pattern)
    })

    it('creates scripts', function () {
      assert.file('script/README.md')
      assert.file('script/cert')
    })

    it('creates Gemfile', function () {
      assert.file('Gemfile')
      assert.file('Gemfile.lock')
    })
  })
})
