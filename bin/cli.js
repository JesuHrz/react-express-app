'use strict'

const minimist = require('minimist')
const inquirer = require('inquirer')
const chalk = require('chalk')

const { message, checkPackageName } = require('../lib')

const argv = minimist(process.argv.slice(2))

async function init () {
  console.log()
  const msg = await message('React Express App')
  console.log(chalk.bold.cyan(msg))
  console.log()

  const packageName = argv._.shift()

  if (packageName === undefined) {
    console.log(chalk.red(
      'You need to add a name to your project \n' +
      'Example: react-express-app <project-name>'
    ))
    console.log()
    process.exit(1)
  }

  checkPackageName(packageName)
}

init().catch(err => {
  console.log(err)
  process.exit(1)
})
