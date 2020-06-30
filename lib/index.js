const figlet = require('figlet')
const validatePackageName = require('validate-npm-package-name')
const chalk = require('chalk')
const inquirer = require('inquirer')

async function handleMessage (mgs = '') {
  return new Promise((resolve, reject) => {
    if (!mgs) reject(new Error('Need to add a message'))
    figlet(mgs, function (err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function checkPackageName (packageName = '') {
  const {
    validForNewPackages,
    errors = [],
    warnings = []
  } = validatePackageName(packageName)

  if (!validForNewPackages) {
    console.log(chalk.red(
      'You need to add a name to your project \n' +
      `Example: react-express-app ${chalk.cyan('<project-name>')}`
    ))
    const allWarningsAndErros = [...errors, ...warnings]
    allWarningsAndErros
      .forEach(e => console.log(chalk.red(` - ${e}`)))
    process.exit(1)
  }
}

async function handlePrompts () {
  return new Promise(async (resolve, reject) => {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'redux',
          message: 'Would you like to incorporate redux in your project?',
          default: true
        },
        {
          type: 'list',
          name: 'preprocessor',
          message: 'Which css preprocessor would you like to incorporate?',
          choices: ['None', 'Sass', 'Less'],
          default: 'None'
        }
      ])
      resolve(answers)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  handleMessage,
  checkPackageName,
  handlePrompts,
  createDirectoriesAndFiles: require('./createDirectoriesAndFiles')
}
