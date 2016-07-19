'use strict'
var generators = require('yeoman-generator')

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)

    // This method adds support for a `--skip-install` flag
    this.option('skipInstall', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Do not install Carthage deps'
    })
  },

  prompting: {
    askFor: function () {
      // Have Yeoman greet the user.
      this.log('Welcome to using swift.framework generator!')
      this.log('If you have any questions, please submit issue at https://github.com/cybertk/generator-swift-framework/issues')
      this.log()

      var prompts = [{
        type: 'input',
        name: 'projectName',
        message: 'Project Name',
        default: 'MyProject'
      }, {
        type: 'input',
        name: 'organizationName',
        message: 'Organization Name',
        default: 'MyOrg',
        store: true
      }, {
        type: 'input',
        name: 'organizationId',
        message: 'Organization Identifier',
        default: 'org.my',
        store: true
      }]

      return this.prompt(prompts).then(function (answers) {
        this.projectName = answers.projectName
        this.organizationName = answers.organizationName
        this.organizationId = answers.organizationId
      }.bind(this))
    },

    askForCocoaPods: function () {
      var prompts = [{
        type: 'confirm',
        name: 'cocoapods',
        message: 'Would you like to distribute via CocoaPods?',
        default: true
      }]

      return this.prompt(prompts).then(function (answers) {
        this.cocoapods = answers.cocoapods
      }.bind(this))
    },

    askForGitHub: function () {
      var prompts = [{
        type: 'input',
        name: 'githubUser',
        message: 'Would you mind telling me your username on GitHub?',
        store: true
      }]

      return this.prompt(prompts).then(function (answers) {
        this.githubUser = answers.githubUser
      }.bind(this))
    },

    askForTravis: function () {
      var prompts = [{
        type: 'confirm',
        name: 'travis',
        message: 'Would you like to enable Travis CI?',
        default: true
      }]

      return this.prompt(prompts).then(function (answers) {
        this.travis = answers.travis
      }.bind(this))
    },

    askForCertPath: function () {
      var travis = this.travis

      var prompts = [{
        type: 'confirm',
        name: 'mobileprovision',
        message: 'Would you like to provision Development Certificate',
        default: true,
        store: true,
        when: function () {
          return travis
        }
      }]

      return this.prompt(prompts).then(function (answers) {
        this.mobileprovision = answers.mobileprovision
      }.bind(this))
    }
  },

  default: function () {
    this.composeWith('swift-framework:xcode', {
      options: {
        organizationName: this.organizationName,
        organizationId: this.organizationId,
        projectName: this.projectName
      }
    }, {
      local: require.resolve('../xcode')
    })

    this.composeWith('swift-framework:readme', {
      options: {
        projectName: this.projectName,
        githubUser: this.githubUser
      }
    }, {
      local: require.resolve('../readme')
    })

    this.composeWith('swift-framework:contributing', {
      options: {
        projectName: this.projectName
      }
    }, {
      local: require.resolve('../contributing')
    })

    this.composeWith('swift-framework:script', {
      options: {
        projectName: this.projectName
      }
    }, {
      local: require.resolve('../script')
    })

    this.composeWith('swift-framework:license', {
      options: {
        organizationName: this.organizationName
      }
    }, {
      local: require.resolve('../license')
    })

    this.composeWith('swift-framework:carthage', {
      options: {
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require.resolve('../carthage')
    })

    this.composeWith('swift-framework:gitignore', {}, {
      local: require.resolve('../gitignore')
    })

    if (this.travis) {
      this.composeWith('swift-framework:travis', {}, {
        local: require.resolve('../travis')
      })
    }

    if (this.mobileprovision) {
      this.composeWith('swift-framework:mobileprovision', {}, {
        local: require.resolve('../mobileprovision')
      })
    }

    if (this.cocoapods) {
      this.composeWith('swift-framework:cocoapods', {
        options: {
          projectName: this.projectName,
          githubUser: this.githubUser
        }
      }, {
        local: require.resolve('../cocoapods')
      })
    }
  },

  end: {
    openXcode: function () {
      if (this.options.openXcode !== false) {
        this.spawnCommand('open', [this.destinationPath(this.projectName + '.xcodeproj')])
      }
    }
  }
})
