import React from 'react';
import Constant from '../../constant'
import Logout from "../logout/Logout"
import UserData from "../app/UserData"
import Login from "../login/Login"

async function checkValidToken() {
  const { tokenData, usernameData, roleData } = UserData();
  console.log("this.token = "  + tokenData.data);

  return await fetch(
    Constant.validate_token, 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenData.data
      }
    }
  ).then(function(response) {
    console.log("login success fully ");
    return true;

  }).catch(function() {
    console.log("error in get resource with token -> login again");
    tokenData.delete();
    usernameData.delete();
    roleData.delete();

    return false;
  });
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits : [],
      isLoading: false,
    }
  }

  loadData() {
    fetch(Constant.user_registration,  {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token.data
      }
    })
      .then(response => response.json());
  }

  loadUserRegistration(){
    // var rawJson = { item : "dsd" };
    console.log("loadUserRegistration");
  }

  render() {
    const response = checkValidToken();
    
    if (!response) {
      return <Login></Login>;
    }

    return(
      <div>
        <h2>Dashboard: </h2>
        <button type="button" onClick={Logout}>Logout!</button>
        <button type="button" onClick={this.loadUserRegistration}>loadUserRegistration</button>
      </div>
    );
  }
}

export default Dashboard;