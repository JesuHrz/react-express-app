'use strict'

const minimist = require('minimist')
const chalk = require('chalk')

const {
  handleMessage,
  checkPackageName,
  handlePrompts
} = require('../lib')

const argv = minimist(process.argv.slice(2))

async function init () {
  try {
    const packageName = argv._.shift()
    const msg = await handleMessage('React Express App')

    console.log()
    console.log(chalk.bold.cyan(msg))

    checkPackageName(packageName)
    const { redux, preprocessor } = await handlePrompts()
  } catch (e) {
    console.error(chalk.red(e.stack))
    process.exit(1)
  }
}

init().catch(e => {
  console.error(chalk.red(e.stack))
  process.exit(1)
})
