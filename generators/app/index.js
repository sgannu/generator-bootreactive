'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('JVM micro-service') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: 'jvm-microservice'
      },
      {
        type: 'list',
        name: 'template',
        choices: [{ name: 'Springboot - java', value: 'j-sb' },
        { name: 'Spring5boot - java reactive', value: 'j-s5b' }],
        message: 'Select type of microservice template:',
        default: 'j-sb'
      },
      {
        type: 'list',
        name: 'buildTool',
        choices: ['gradle', 'maven'],
        message: 'Select build tool:',
        default: 'gradle'
      }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.log("TEMPLATE: " + this.props.template);
    this.log("TEMPLATE: " + this.props.buildTool);

    this.handleBuildConfig();
  }

  install() {
    // this.installDependencies();
  }


  handleBuildConfig() {
    this.fs.copyTpl(
      this.templatePath('config/' + this.props.buildTool),
      this.destinationPath(this.props.name),
      { name: this.props.name }
    );
  }
};
