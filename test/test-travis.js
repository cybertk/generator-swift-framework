/* global describe, before, it */

'use strict'

var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')

describe('swift.framework:travis', function () {
  describe('with all features enabled', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/travis'))
        .on('end', done)
    })

    it('creates travis', function () {
      assert.file('.travis.yml')
    })
  })
})
