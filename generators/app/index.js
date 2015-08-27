'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var glob = require('glob');
var yaml = require('yamljs');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
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
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {

            var tp = this.templatePath();
            glob.sync(path.join(tp, '**'), {
                nodir: true
            }).forEach(function (file) {

                var source = path.relative(tp, file);
                source = source.replace(/PROJECT_NAME/g, this.props.projectName);

                this.fs.copyTpl(file, this.destinationPath(source), this.props);

            }, this);
        },

        license: function () {
            this.fs.copyTpl(this.templatePath('LICENSE'), this.destinationPath('LICENSE'), this.props);
        },

        travis: function () {
            var script = {
                language: 'objective-c',
                script: [
                    'xcodebuild test -sdk iphonesimulator -scheme ' + this.props.projectName,
                ],
            };
            this.fs.write(this.destinationPath('.travis.yml'), yaml.stringify(script, 2));
        }
    },

    install: function () {}
});
