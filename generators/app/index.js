'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var readdirp = require('readdirp');
var yaml = require('yamljs');
var _ = require('underscore');

module.exports = yeoman.generators.Base.extend({
    prompting: {
        askFor: function () {
            var done = this.async();

            // Have Yeoman greet the user.
            this.log(yosay('Welcome to the outstanding ' + chalk.red('swift.framework') + ' generator!'));

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
            }];

            this.prompt(prompts, function (props) {
                this.projectName = props.projectName;
                this.organizationName = props.organizationName;
                this.organizationId = props.organizationId;

                this.props = props;

                done();
            }.bind(this));
        },

        askForCocoaPods: function () {
            var done = this.async();

            var prompts = [{
                type: 'confirm',
                name: 'cocoapods',
                message: 'Would you like to distribute via CocoaPods?',
                default: true
            }];

            this.prompt(prompts, function (props) {
                this.cocoapods = props.cocoapods;
                done();
            }.bind(this));
        },

        askForGitHub: function () {
            var done = this.async();
            var cocoapods = this.cocoapods;

            var prompts = [{
                type: 'input',
                name: 'githubUser',
                message: 'Would you mind telling me your username on GitHub?',
                store: true,
                when: function () {
                    return cocoapods;
                }
            }];

            this.prompt(prompts, function (props) {
                this.githubUser = props.githubUser;
                this.props = _.extend(this.props, props);
                done();
            }.bind(this));
        },
    },

    writing: {
        xcodeproj: function () {
            var done = this.async();
            var options = {
                root: this.templatePath(),
                fileFilter: [
                    '!.gitignore',
                    '!LICENSE',
                    '!PROJECT_NAME.podspec',
                ],
            };

            readdirp(options)
                .on('data', function (entry) {
                    var source = entry.path.replace(/PROJECT_NAME/g, this.projectName);
                    // console.log(entry.fullPath, this.destinationPath(source))
                    this.fs.copyTpl(entry.fullPath, this.destinationPath(source), this.props);
                }.bind(this))
                .on('end', function () {
                    done();
                });
        },

        license: function () {
            this.fs.copyTpl(this.templatePath('LICENSE'), this.destinationPath('LICENSE'), this.props);
        },

        projectFiles: function () {
            this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
        },

        travis: function () {
            var script = {
                language: 'objective-c',
                script: [
                    'xcodebuild test -sdk iphonesimulator -scheme ' + this.props.projectName,
                ],
            };
            this.fs.write(this.destinationPath('.travis.yml'), yaml.stringify(script, 2));
        },

        cocoapods: function () {
            if (!this.cocoapods) {
                return;
            }

            var podspec = this.destinationPath(this.projectName + '.podspec');
            this.fs.copyTpl(this.templatePath('PROJECT_NAME.podspec'), podspec, this.props);
        },
    },

    install: function () {}
});
