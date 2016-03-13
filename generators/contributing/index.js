'use strict'
var yeoman = require('yeoman-generator')

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments)

    this.option('projectName', {
      type: String,
      required: true,
      defaults: 'MyProject',
      desc: 'Project name'
    })
  },

  initializing: function () {
    this.fs.copyTpl(this.templatePath('CONTRIBUTING.md'), this.destinationPath('CONTRIBUTING.md'), this.options)
  }
})
