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
    this.fs.copyTpl(this.templatePath('CONTRIBUTING.md'), this.destinationPath('CONTRIBUTING.md'), this.options)
  }
})
