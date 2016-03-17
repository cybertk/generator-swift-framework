'use strict'
var yeoman = require('yeoman-generator')
var glob = require('glob')

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments)

    this.option('organizationName', {
      type: String,
      required: true,
      desc: 'Organization name'
    })
    this.option('organizationId', {
      type: String,
      required: true,
      desc: 'Organization Id'
    })
    this.option('projectName', {
      type: String,
      required: true,
      desc: 'Project Name'
    })
  },

  writing: {
    xcode: function () {
      var files = glob.sync('**/*', {
        cwd: this.templatePath('.'),
        nodir: true
      })

      files.forEach(function (entry) {
        var source = entry

        // Handle file name
        source = source.replace(/PROJECT_NAME/g, this.options.projectName)

        this.fs.copyTpl(this.templatePath(entry), this.destinationPath(source), this.options)

        // Handle .xcodeproj
        var data = this.fs.read(this.destinationPath(source), 'utf8')
        data = data.replace(/ORGANIZATION-ID.PROJECT-NAME/g,
          this.options.organizationId + '.' + this.options.projectName)
        data = data.replace(/PROJECT_NAME/g, this.options.projectName)
        data = data.replace(/ORGANIZATION_NAME/g, this.options.organizationName)
        data = data.replace(/ORGANIZATION-ID/g, this.options.organizationId)
        this.fs.write(this.destinationPath(source), data, 'utf8')
      }.bind(this))
    }

  }
})
