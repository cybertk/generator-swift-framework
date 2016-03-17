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
    let podspec = this.destinationPath(`${this.options.projectName}.podspec`)
    this.fs.copyTpl(this.templatePath('PROJECT_NAME.podspec'), podspec, this.options)
  }
})
