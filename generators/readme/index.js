'use strict'
const generators = require('yeoman-generator')

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)

    this.option('githubUser', {
      type: String,
      required: true,
      desc: 'Github user name'
    })
    this.option('projectName', {
      type: String,
      required: true,
      desc: 'Project name'
    })
  },

  initializing: function () {
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), this.options)
  }
})
