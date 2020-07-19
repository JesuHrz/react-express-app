import React from 'react'

import './styles.css'

const commands = [
  {
    command: 'npm run build:prod',
    description: 'Builds the project to production.'
  },
  {
    command: 'npm run build:dev',
    description: 'Starts the project in development mode.'
  },
  {
    command: 'npm run test',
    description: 'Runs the tests.'
  },
  {
    command: 'npm run lint',
    description: 'Runs the linter.'
  }
]

const Intructions = () => {
  return (
    <div className='instructions'>
      <p className='instructions__title'>
        Remember that you can run these commands inside the project:
      </p>
      <ul className='menu'>
        {commands.map(({ command, description }, i) => (
          <li className='menu__item' key={i}>
            <p className='item__command'>{command}</p>
            <p className='item__description'>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Intructions
