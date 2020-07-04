'use strict'

const minimist = require('minimist')
const chalk = require('chalk')
const Listr = require('listr')
const path = require('path')

const {
  handleMessage,
  checkPackageName,
  handlePrompts,
  createDirectoriesAndFiles,
  removeDirectoriesAndFiles,
  runCommand,
  scriptLogs
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

    if (process.env.NODE_ENV === 'development') {
      await removeDirectoriesAndFiles(projectName)
    }

    console.log()
    console.log(chalk.yellow('This process could take a couple of seconds.'))
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
            const { stdout } = await runCommand('git', ['init'], { cwd: root })
            ctx.git = stdout
          } catch (e) {
            task.skip(e.message)
            throw new Error(e)
          }
        }
      },
      {
        title: 'Installing dependencies with npm',
        task: async (ctx, task) => {
          try {
            const { stdout } = await runCommand('npm', ['install'], { cwd: root })
            ctx.npm = stdout
          } catch (e) {
            task.skip(e.message)
            throw new Error(e)
          }
        }
      }
    ])
    const { git, npm } = await tasks.run()
    console.log()
    console.log(chalk.green(git))
    console.log(npm)

    await runCommand('git', ['add', '.'], { cwd: root })
    await runCommand(
      'git',
      ['commit', '-m', 'Project initialized with React Express App'],
      { cwd: root }
    )

    console.log()
    console.log(chalk.green('First commit created.'))
    console.log()

    console.log(
      chalk.bold.white('Your project has been successfully created at:'),
      chalk.green(root)
    )
    console.log()

    scriptLogs(projectName)

    console.log(chalk.green('Enjoy it 🧑🏻‍💻!'))
    console.log()
  } catch (e) {
    console.log()
    console.error(chalk.red(e.stack))
    console.log()
    process.exit(1)
  }
}

init().catch(e => {
  console.error(chalk.red(e.stack))
  process.exit(1)
})
