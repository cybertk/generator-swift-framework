/* global describe, before, it */

'use strict'

var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')

describe('swift.framework:carthage', function () {
  describe('with all features enabled', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/carthage'))
        .on('end', done)
    })

    it('creates carthage', function () {
      assert.file('Cartfile.private')
      assert.file('Cartfile.resolved')
    })
  })
})
