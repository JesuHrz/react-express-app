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

async function init () {
  try {
    const projectName = argv._.shift()
    const msg = await handleMessage('React Express App')

    console.log()
    console.log(chalk.bold.cyan(msg))
    console.log()

    checkPackageName(projectName)
    const root = path.resolve(projectName)
    const { redux, preprocessor } = await handlePrompts()

    console.log()
    console.log(
      chalk.bold.white('Creating project with React in:'),
      chalk.green(root)
    )

    const tasks = new Listr([
      {
        title: 'Procesing files',
        task: async (_, task) => {
          try {
            await createDirectoriesAndFiles(
              templatePath,
              root,
              { projectName, redux, preprocessor }
            )
          } catch (e) {
            task.skip(e.message)
            throw new Error(e.message)
          }
        }
      },
      {
        title: 'Initializing a git repository',
        task: async (ctx, task) => {
          try {
            const { stdout } = await execa('git', ['init'], { cwd: root })
            ctx.git = stdout
          } catch (e) {
            if (e.code === 'ENOENT') {
              const message = `Command failed: ${e.command}. Try installing git`
              task.skip(message)
              throw new Error(message)
            }
            task.skip(e.stderr)
            throw new Error(e.stderr)
          }
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
