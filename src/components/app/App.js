import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from '../dashboard/Dashboard';
import Login from '../login/Login';
import Preferences from '../preferences/Preferences';
import Logout from "../logout/Logout";
import UserData from './UserData';


function App() {
  const { token, setToken, deleteToken,
          username, setUsername, deleteUsername,
          role, setRole, deleteRole 
        } = UserData();

  console.log("token: ", token);

  if(!token) {
    return <Login setToken={setToken} />
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

          <Route path="/logout">
            <Logout/>
          </Route>
        
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;