import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from '../dashboard/Dashboard';
import Login from '../login/Login';
import Preferences from '../preferences/Preferences';
import UserData from './UserData';


function App() {
  const { tokenData } = UserData();

  console.log("token: ", tokenData.data);

  if(!tokenData.data) {
    return <Login />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          
          <Route path="/preferences">
            <Preferences />
          </Route>
      
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;