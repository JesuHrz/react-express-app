const figlet = require('figlet')
const validatePackageName = require('validate-npm-package-name')
const chalk = require('chalk')

function message (mgs = '') {
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

module.exports = {
  message,
  checkPackageName
}
