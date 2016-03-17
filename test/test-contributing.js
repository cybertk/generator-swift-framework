/* global describe, before, it */

'use strict'

var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')

describe('swift.framework:contributing', function () {
  var pattern = /(<%=|%>)/

  describe('with all features enabled', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/contributing'))
        .withOptions({
          projectName: 'F'
        })
        .on('end', done)
    })

    it('creates contributing', function () {
      assert.file('CONTRIBUTING.md')
      assert.noFileContent('CONTRIBUTING.md', pattern)
    })
  })
})
