const figlet = require('figlet')

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

module.exports = {
  message
}
