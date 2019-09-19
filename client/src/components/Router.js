import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from './NotFound'
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';

export default function Router() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path='/login/:token' component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path='/profile' component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
