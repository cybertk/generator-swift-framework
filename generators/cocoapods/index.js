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
    var podspec = this.destinationPath(this.options.projectName + '.podspec')
    this.fs.copyTpl(this.templatePath('PROJECT_NAME.podspec'), podspec, this.options)
  }
})
