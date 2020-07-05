'use strict'

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const fileExtension = require('file-extension')

const {
  COMPILE_FILES,
  IGNORE_FILES,
  REDUX_DIRECTORIES_AND_FILES
} = require('./constants')

async function createDirectoriesAndFiles (templatePath, newPath, options) {
  return new Promise((resolve, reject) => {
    const args = [...arguments]
    if (typeof templatePath === 'undefined' ||
      newPath === 'undefined' || typeof options === 'undefined') {
      reject(new Error(
        "Failed to execute 'createDirectoriesAndFiles': " +
        `3 arguments required, but only ${args.length} present.`
      ))
    }
    for (let i = 0; i < args.length; i++) {
      if (typeof args[i] !== 'string' && i < 2) {
        reject(new Error(
          "Failed to execute 'createDirectoriesAndFiles' " +
          `The ${i + 1} parameter must be string.`
        ))
      }
      if (typeof args[i] !== 'object' && i === 2) {
        reject(new Error(
          "Failed to execute 'createDirectoriesAndFiles' " +
          `The ${i + 1} parameter must be object.`
        ))
      }
    }

    try {
      createDirectoriesAndFilesRecursive(templatePath, newPath, options)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

function createDirectoriesAndFilesRecursive (templatePath, newPath, options) {
  if (reduxDirectoriesAndFiles(options.redux,
    { type: 'directory', stats: newPath }
  )) {
    return
  }

  fs.mkdirSync(newPath)

  const filesToCreate = fs.readdirSync(
    templatePath, {
      encoding: 'utf8',
      withFileTypes: true
    })

  filesToCreate.forEach(stats => {
    const currentPath = `${newPath}/${stats.name}`
    const filePath = path.join(templatePath, stats.name)
    const fileExt = fileExtension(stats.name)
    if (stats.isFile()) {
      const readFile = fs.readFileSync(filePath, 'utf8')
      if (COMPILE_FILES.includes(fileExt)) {
        if (reduxDirectoriesAndFiles(options.redux,
          { type: 'directory', stats: stats.name })
        ) {
          return
        }
        const str = ejs.compile(readFile)(options)
        fs.writeFileSync(currentPath, str, 'utf8')
      } else if (!IGNORE_FILES.includes(fileExt)) {
        fs.writeFileSync(currentPath, readFile, 'utf8')
      }
      return
    }
    createDirectoriesAndFilesRecursive(filePath, currentPath, options)
  })
}

async function removeDirectoriesAndFiles (path) {
  return new Promise((resolve, reject) => {
    const args = [...arguments]
    if (typeof path === 'undefined') {
      reject(new Error(
        "Failed to execute 'removeDirectoriesAndFile': " +
        `The 1 arguments required, but only ${args.length} present.`
      ))
    }
    if (typeof path !== 'string') {
      reject(new Error(
        "Failed to execute 'removeDirectoriesAndFile': " +
        `The 1 parameter must be string.`
      ))
    }
    if (typeof path === 'string' && path.length === 0) {
      reject(new Error(
        "Failed to execute 'removeDirectoriesAndFile': " +
        `The 1 parameter cannot be an empty string.`
      ))
    }

    try {
      removeDirectoriesAndFilesRecursive(path)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

function removeDirectoriesAndFilesRecursive (path) {
  if (fs.existsSync(path)) {
    const directoriesToRemove = fs.readdirSync(
      path,
      { encoding: 'utf8', withFileTypes: true }
    )
    directoriesToRemove.forEach(stats => {
      const filePath = `${path}/${stats.name}`
      if (stats.isDirectory()) {
        removeDirectoriesAndFilesRecursive(filePath)
      } else {
        fs.unlinkSync(filePath)
      }
    })
    fs.rmdirSync(path)
  }
}

function reduxDirectoriesAndFiles (redux, option) {
  if (!redux) {
    switch (option.type) {
      case 'directory': {
        let path = option.stats.split('/')
        if (REDUX_DIRECTORIES_AND_FILES.includes(path[path.length - 1])) {
          return true
        }
        break
      }
      case 'file': {
        if (REDUX_DIRECTORIES_AND_FILES.includes(option.stats)) {
          return true
        }
        break
      }
      default:
        return false
    }
  }
}

module.exports = {
  createDirectoriesAndFiles,
  removeDirectoriesAndFiles
}
