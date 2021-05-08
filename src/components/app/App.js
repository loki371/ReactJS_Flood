import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from '../dashboard/Dashboard';
import Login from '../login/Login';
import Preferences from '../preferences/Preferences';
import UserData from './UserData';

const { tokenData } = UserData();

class App extends React.Component {
  render() {

    if(!tokenData.data) {
      return <Login/>;
    }

    return (
      <div className="wrapper">
        <h1>Application</h1>
        <BrowserRouter>
          <Switch>
            
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/dashboard">
              <Dashboard />
            </Route>
            
            <Route path="/preferences">
              <Preferences />
            </Route>

            <Route>
              <Login />
            </Route>
        
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;