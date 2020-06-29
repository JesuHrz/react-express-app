'use strict'

const minimist = require('minimist')
const inquirer = require('inquirer')
const chalk = require('chalk')

const { message, checkPackageName } = require('../lib')

const argv = minimist(process.argv.slice(2))

async function init () {
  try {
    console.log()
    const msg = await message('React Express App')
    console.log(chalk.bold.cyan(msg))
  } catch (e) {
    console.error(chalk.red(e.stack))
    process.exit(1)
  }

  const packageName = argv._.shift()

  checkPackageName(packageName)

  inquirer.prompt([
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
    .then(answers => {
      console.log('answers', answers)
    })
    .catch(e => {
      console.error(chalk.red(e.stack))
      process.exit(1)
    })
}

init().catch(e => {
  console.error(chalk.red(e.stack))
  process.exit(1)
})
