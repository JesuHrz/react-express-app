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
    console.error(chalk.red(e))
    process.exit(1)
  }

  const packageName = argv._.shift()

  checkPackageName(packageName)
}

init().catch(err => {
  console.error(err)
  process.exit(1)
})
