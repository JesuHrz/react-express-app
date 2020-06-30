'use strict'

const minimist = require('minimist')
const chalk = require('chalk')
const execa = require('execa')
const Listr = require('listr')
const path = require('path')

const {
  handleMessage,
  checkPackageName,
  handlePrompts,
  createDirectoriesAndFiles
} = require('../lib')

const argv = minimist(process.argv.slice(2))
const templatePath = path.join(__dirname, '../templates')
const currentPath = process.cwd()

async function init () {
  try {
    const projectName = argv._.shift()
    const msg = await handleMessage('React Express App')

    console.log()
    console.log(chalk.bold.cyan(msg))

    checkPackageName(projectName)
    const { redux, preprocessor } = await handlePrompts()

    const tasks = new Listr([
      {
        title: 'Procesing files',
        task: async () => {
          await createDirectoriesAndFiles(
            templatePath,
            `${currentPath}/${projectName}`,
            { projectName, redux }
          )
        }
      }
    ])
    await tasks.run()
  } catch (e) {
    console.error(chalk.red(e.stack))
    process.exit(1)
  }
}

init().catch(e => {
  console.error(chalk.red(e.stack))
  process.exit(1)
})
