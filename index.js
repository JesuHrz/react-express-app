#!/usr/bin/env node

'use strict'

const chalk = require('chalk')

const nodeVersion = process.versions.node
const major = nodeVersion.split('.')[0]

if (process.env.NODE_ENV === 'development') {
  console.log()
  console.log(chalk.yellow(
    'You are running React Express App ' +
    'in development mode.'
  ))
}

if (major < 10) {
  console.log(chalk.red(
    `Your node version is ${major}, ` +
    'in order to use react you need to have a node version equal or higher than 10.'
  ))
  process.exit(1)
}

require('./bin/cli')
