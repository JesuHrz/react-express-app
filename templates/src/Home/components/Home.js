import React from 'react'

import './styles.css'

import logoKoombea from '../../../assets/images/logo-koombea.png'
import logoReact from '../../../assets/images/logo-react.png'

const Home = props => {
  return(
    <div className='container__home'>
      <div className='home__layout'>
        <h1 className='layout__title'>Koombea React Generator</h1>
        <div className='layout__container-logo'>
          <img className='logo-koombea' src={logoKoombea} />
          <div className='layout__line' />
          <img className='logo-react' src={logoReact} />
        </div>
        <p className='layout__name-project'>Your Project: <span><%= projectName %></span></p>
      </div>
      <div className='home__footer'>
        <p className='footer__title'>{`2007 - ${new Date().getFullYear()} Koombea, Inc. All Rights Reserved`}</p>
      </div>
    </div>
  )
}

export default Home
