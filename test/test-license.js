/* global describe, before, it */

'use strict'

var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')

describe('swift.framework:license', function () {
  var pattern = /(<%=|%>)/

  describe('with all features enabled', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/license'))
        .withOptions({
          organizationName: 'O'
        })
        .on('end', done)
    })

    it('creates license', function () {
      assert.file('LICENSE')
      assert.noFileContent('LICENSE', pattern)
    })
  })
})
