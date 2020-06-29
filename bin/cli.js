'use strict'

const minimist = require('minimist')
const inquirer = require('inquirer')
const figlet = require('figlet')
const chalk = require('chalk')

const { message } = require('../lib')

const argv = minimist(process.argv.slice(2))

async function init () {
  const msg = await message('React Express App')
  console.log(chalk.bold.cyan(msg))

  const command = argv._.shift()

  console.log(command)
}

init().catch(err => {
  console.log(err)
  process.exit(1)
})
