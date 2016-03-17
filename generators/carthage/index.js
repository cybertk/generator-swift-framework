'use strict'
const generators = require('yeoman-generator')

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

      this.log('Carthage bootstraping')

      let done = this.async()
      let child = this.spawnCommand('carthage', ['bootstrap'])
      child.on('exit', done)
    }
  }
})
