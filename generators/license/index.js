'use strict'
var yeoman = require('yeoman-generator')

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments)

    this.option('organizationName', {
      type: String,
      required: true,
      defaults: 'MyOrg',
      desc: 'Organization name'
    })
  },

  initializing: function () {
    this.fs.copyTpl(this.templatePath('LICENSE'), this.destinationPath('LICENSE'), this.options)
  }
})
