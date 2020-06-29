import React from 'react'
import { Provider } from 'react-redux'

import './styles.css'
import store from '../../store'

const App = props => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

export default App
