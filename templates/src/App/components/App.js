import React, { Fragment } from 'react'

import './styles.css'

const App = props => {
  return (
    <Fragment>
      {props.children}
    </Fragment>
  )
}

export default App
