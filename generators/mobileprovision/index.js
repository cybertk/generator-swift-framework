'use strict'
const generators = require('yeoman-generator')
const path = require('path')
const fs = require('fs')

const resolvePath = function (string) {
  if (string.substr(0, 1) === '~') {
    string = process.env.HOME + string.substr(1)
  }
  return path.resolve(string)
}

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)

    this.option('organizationName', {
      type: String,
      required: true,
      desc: 'Organization name'
    })
  },
  prompting: {
    askForCertPath: function () {
      let done = this.async()

      let prompts = [{
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
          let done = this.async()

          answers.certPath = resolvePath(answers.certPath)
          fs.stat(answers.certPath, (err, stats) => {
            if (err || !stats.isFile()) {
              answers.certPath = null
            }
            done(answers.certPath === null)
          })
        }
      }]

      this.prompt(prompts, (props) => {
        if (props.askCertPathAgain) {
          return this.prompting.askForCertPath.call(this)
        }

        this.certPath = props.certPath
        done()
      })
    }
  },

  writing: function () {
    if (this.certPath) {
      this.fs.copy(this.certPath, this.destinationPath('script/certificates/development.p12'))
    }
  }
})
