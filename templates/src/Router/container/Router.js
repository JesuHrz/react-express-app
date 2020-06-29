import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

<% if (redux) { %>import App from '../../App/container/App'<% } else { %>import App from '../../App/components/App'<% } %>
import Home from '../../Home/components/Home'

const Router = props => {
  return (
    <App>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </BrowserRouter>
    </App>
  )
}

export default Router
