'use strict'
var yeoman = require('yeoman-generator')

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments)

    this.option('githubUser', {
      type: String,
      required: true,
      defaults: '',
      desc: 'Github user name'
    })
    this.option('projectName', {
      type: String,
      required: true,
      defaults: 'MyProject',
      desc: 'Project name'
    })
  },

  initializing: function () {
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), this.options)
  }
})
