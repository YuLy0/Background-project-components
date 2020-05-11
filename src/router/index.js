import App from '../App'
import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from '../views/home'
import Other from '../views/other'


const getRouter = _ => (
  <HashRouter>
    <App path="/">
      <Switch>
        {/* <Route path="/" exact render={props => <Home {...props}/>} /> */}
        {/* <React path='/other' render={props => <Other {...props}/>} /> */}
        <Route path="/" exact  component={Home} />
        <React path='/other' component={Other} />

      </Switch>
    </App>
  </HashRouter>
)

export default getRouter