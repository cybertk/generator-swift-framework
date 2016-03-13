'use strict'
var yeoman = require('yeoman-generator')
var path = require('path')
var fs = require('fs')

var resolvePath = function (string) {
  if (string.substr(0, 1) === '~') {
    string = process.env.HOME + string.substr(1)
  }
  return path.resolve(string)
}

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
  prompting: {
    askForCertPath: function () {
      var done = this.async()

      var prompts = [{
        type: 'input',
        name: 'certPath',
        message: 'Development Certificate Path',
        default: 'path/to/development.p12',
        store: true
      }, {
        type: 'confirm',
        name: 'askCertPathAgain',
        message: 'The certificate you provide does not exist, specify again?',
        default: true,
        when: function (answers) {
          var done = this.async()

          answers.certPath = resolvePath(answers.certPath)
          fs.stat(answers.certPath, function (err, stats) {
            if (err || !stats.isFile()) {
              answers.certPath = null
            }
            done(answers.certPath === null)
          })
        }
      }]

      this.prompt(prompts, function (props) {
        if (props.askCertPathAgain) {
          return this.prompting.askForCertPath.call(this)
        }

        this.certPath = props.certPath
        done()
      }.bind(this))
    }
  },

  writing: function () {
    if (this.certPath) {
      this.fs.copy(this.certPath, this.destinationPath('script/certificates/development.p12'))
    }
  }
})
