const figlet = require('figlet')
const validatePackageName = require('validate-npm-package-name')
const chalk = require('chalk')

function message (mgs) {
  return new Promise((resolve, reject) => {
    figlet(mgs, function (err, data) {
      if (err) {
        console.dir(err)
        reject(err)
      }
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
    console.error(chalk.red(
      'You need to add a name to your project \n' +
      'Example: react-express-app <project-name>'
    ))
    const allWarningsAndErros = [...errors, ...warnings]
    allWarningsAndErros.forEach(e => console.error(chalk.red(` - ${e}`)))
    process.exit(1)
  }
}

module.exports = {
  message,
  checkPackageName
}
