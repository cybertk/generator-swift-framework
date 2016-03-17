'use strict'
const generators = require('yeoman-generator')

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)

    this.option('projectName', {
      type: String,
      required: true,
      desc: 'Project name'
    })
  },

  initializing: function () {
    this.fs.copyTpl(this.templatePath('Makefile'), this.destinationPath('Makefile'), this.options)
    this.fs.copy(this.templatePath('script/*'), this.destinationPath('script/'))
    this.fs.copy(this.templatePath('Gemfile*'), this.destinationPath('./'))
  }
})
