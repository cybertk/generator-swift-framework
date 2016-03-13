'use strict'
var yeoman = require('yeoman-generator')

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments)
  },

  initializing: function () {
    this.fs.copy(this.templatePath('.travis.yml'), this.destinationPath('.travis.yml'))
  }
})