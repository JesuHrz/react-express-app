module.exports = {
  IGNORE_FILES: ['ds_store'],
  COMPILE_FILES: ['js', 'json', 'html', 'css', 'scss', 'jsx'],
  SCRIPTS: [
    {
      script: 'npm run build:prod',
      description: 'Builds the project to production.'
    },
    {
      script: 'npm run build:dev',
      description: 'Starts the project in development mode.'
    },
    {
      script: 'npm run test',
      description: 'Runs the tests.'
    },
    {
      script: 'npm run lint',
      description: 'Runs the linter.'
    }
  ]
}
