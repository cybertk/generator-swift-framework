'use strict'
var yeoman = require('yeoman-generator')

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments)

    // This method adds support for a `--skip-install` flag
    this.option('skip-install', {
      desc: 'Do not install Carthage deps'
    })

    this.option('organizationName', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    })
    this.option('organizationId', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    })
    this.option('projectName', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    })
  },

  writing: {
    xcode: function () {
      var files = [
        // The list is generated by `find . -type f -exec echo \'{}\', \;`
        'Example/AppDelegate.swift',
        'Example/Assets.xcassets/AppIcon.appiconset/Contents.json',
        'Example/Base.lproj/LaunchScreen.storyboard',
        'Example/Base.lproj/Main.storyboard',
        'Example/Info.plist',
        'Example/ViewController.swift',
        'PROJECT_NAME/Info.plist',
        'PROJECT_NAME/PROJECT_NAME.h',
        'PROJECT_NAME/PROJECT_NAME.swift',
        'PROJECT_NAME.xcodeproj/project.pbxproj',
        'PROJECT_NAME.xcodeproj/project.xcworkspace/contents.xcworkspacedata',
        'PROJECT_NAME.xcodeproj/xcshareddata/xcschemes/PROJECT_NAME.xcscheme',
        'UnitTests/Info.plist',
        'UnitTests/UnitTests.swift'
      ]

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
