import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'

import './styles.css'

import Instructions from 'components/Instructions'

const Home = props => {
  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className='home'>
        <h1 className='title'>React Express App</h1>
        <h2 className='quote'>
          Your app was successfully created:&nbsp;
          <span>Project Test</span>
        </h2>
        <Instructions />
        <p className='🧑🏻‍💻'>Enjoy it 🧑🏻‍💻!</p>
      </div>
    </Fragment>
  )
}

export default Home
