'use strict'
var generators = require('yeoman-generator')

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)

    this.option('skipInstall', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Do not install Carthage deps'
    })
  },

  initializing: function () {
    this.fs.copy(this.templatePath('Cartfile.*'), this.destinationPath('./'))
  },

  install: {
    carthageBootstrap: function () {
      if (this.options.skipInstall) {
        this.log('Please run `carthage bootstrap`')
        return
      }

      var done = this.async()

      this.log('Carthage bootstraping')
      var child = this.spawnCommand('carthage', ['bootstrap'])
      child.on('exit', done)
    }
  }
})
