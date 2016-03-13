'use strict'
var yeoman = require('yeoman-generator')

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments)
  },

  initializing: function () {
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'))
  }
})
