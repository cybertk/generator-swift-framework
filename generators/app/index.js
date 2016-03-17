'use strict'
const generators = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const _ = require('underscore')

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
      let done = this.async()

      // Have Yeoman greet the user.
      this.log(yosay('Welcome to the outstanding ' + chalk.red('swift.framework') + ' generator!'))

      let prompts = [{
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

      this.prompt(prompts, (props) => {
        this.projectName = props.projectName
        this.organizationName = props.organizationName
        this.organizationId = props.organizationId

        this.props = props

        done()
      })
    },

    askForCocoaPods: function () {
      let done = this.async()

      let prompts = [{
        type: 'confirm',
        name: 'cocoapods',
        message: 'Would you like to distribute via CocoaPods?',
        default: true
      }]

      this.prompt(prompts, (props) => {
        this.cocoapods = props.cocoapods
        done()
      })
    },

    askForGitHub: function () {
      let done = this.async()

      let prompts = [{
        type: 'input',
        name: 'githubUser',
        message: 'Would you mind telling me your username on GitHub?',
        store: true
      }]

      this.prompt(prompts, (props) => {
        this.githubUser = props.githubUser
        this.props = _.extend(this.props, props)
        done()
      })
    },

    askForTravis: function () {
      let done = this.async()

      let prompts = [{
        type: 'confirm',
        name: 'travis',
        message: 'Would you like to enable Travis CI?',
        default: true
      }]

      this.prompt(prompts, (props) => {
        this.travis = props.travis
        done()
      })
    },

    askForCertPath: function () {
      let done = this.async()
      let travis = this.travis

      let prompts = [{
        type: 'confirm',
        name: 'mobileprovision',
        message: 'Would you like to provision Development Certificate',
        default: true,
        store: true,
        when: function () {
          return travis
        }
      }]

      this.prompt(prompts, (props) => {
        this.mobileprovision = props.mobileprovision
        done()
      })
    }
  },

  default: function () {
    this.composeWith('swift-framework:xcode', {
      options: {
        organizationName: this.props.organizationName,
        organizationId: this.props.organizationId,
        projectName: this.props.projectName
      }
    }, {
      local: require.resolve('../xcode')
    })

    this.composeWith('swift-framework:readme', {
      options: {
        projectName: this.props.projectName,
        githubUser: this.props.githubUser
      }
    }, {
      local: require.resolve('../readme')
    })

    this.composeWith('swift-framework:contributing', {
      options: {
        projectName: this.props.projectName
      }
    }, {
      local: require.resolve('../contributing')
    })

    this.composeWith('swift-framework:script', {
      options: {
        projectName: this.props.projectName
      }
    }, {
      local: require.resolve('../script')
    })

    this.composeWith('swift-framework:license', {
      options: {
        organizationName: this.props.organizationName
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
          projectName: this.props.projectName,
          githubUser: this.props.githubUser
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
