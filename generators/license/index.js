'use strict'
const generators = require('yeoman-generator')

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)

    this.option('organizationName', {
      type: String,
      required: true,
      desc: 'Organization name'
    })
  },

  initializing: function () {
    this.fs.copyTpl(this.templatePath('LICENSE'), this.destinationPath('LICENSE'), this.options)
  }
})
