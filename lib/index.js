const figlet = require('figlet')
const validatePackageName = require('validate-npm-package-name')
const chalk = require('chalk')
const inquirer = require('inquirer')
const execa = require('execa')

const { SCRIPTS } = require('./constants')

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

async function runCommand (command, flags, options) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await execa(command, flags, options)
      resolve(result)
    } catch (e) {
      if (e.code === 'ENOENT') {
        const message = `Command failed: ${e.command}.`
        reject(new Error(message))
      }
      reject(e.stderr)
    }
  })
}

function scriptLogs (projectName) {
  console.log(
    chalk.bold.white('To run this project, you can type in:'),
    chalk.bold.cyan(`cd ${projectName} && npm run build:dev`)
  )
  console.log()

  console.log(
    chalk.bold.white(
      'This project provides certain commands that will be used for you ' +
      'such as:'
    )
  )
  console.log()

  SCRIPTS.forEach(({ script, description }) => {
    console.log(
      chalk.bold.white(' *'),
      chalk.bold.cyan(script)
    )
    console.log(
      ' '.repeat(2),
      chalk.bold.white(description)
    )
    console.log()
  })
}

module.exports = {
  handleMessage,
  checkPackageName,
  handlePrompts,
  ...require('./directoriesAndFiles'),
  runCommand,
  scriptLogs
}
