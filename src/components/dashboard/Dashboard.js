import React from 'react';
import Constant from '../../constant'
import Logout from "../logout/Logout"
import UserData from "../app/UserData"

const userData = UserData();
var roleData = userData.roleData;
var tokenData = userData.tokenData;
var usernameData = userData.usernameData;

async function checkValidToken() {
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

// async function loadUserRegistration() {
//   const { tokenData, usernameData, roleData } = UserData();
//   return await fetch(
//     Constant.validate_token, 
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': tokenData.data
//       }
//     }
//   ).then(function(response) {
//     console.log("login success fully ");
//     return true;

//   }).catch(function() {
//     console.log("error in get resource with token -> login again");
//     tokenData.delete();
//     usernameData.delete();
//     roleData.delete();

//     return false;
//   });
// }

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

  componentDidMount() {
    if (!checkValidToken()) {
      this.props.history.push(Constant.login_client);
    }
  }

  componentWillUnmount() {}

  loadUserRegistrationAuthority(){
    console.log("loadUserRegistration Authority");
  }

  loadUserRegistrationRescuer(){
    console.log("loadUserRegistration Rescuer");
  }

  loadUserRegistrationVolunteer(){
    console.log("loadUserRegistration Volunteer");
  }

  loadAuthorityRegistration(){

  }

  loadVolunteerRegistration() {

  }

  loadRescuerRegistration() {

  }

  renderclonegido(role) {
    switch(role) {
      case "ROLE_USER":
        return null;

      case "ROLE_AUTHORITY":
        return <div>
          <button type="button" onClick={this.loadUserRegistrationAuthority}>User Registration</button>
          <button type="button" onClick={this.loadAuthorityRegistration}>Authority Registration</button>
          <button type="button" onClick={this.loadVolunteerRegistration}>Volunteer Registration</button>
          <button type="button" onClick={this.loadRescuerRegistration}>Rescuer Registration</button>
        </div>;

      case "ROLE_RESCUER":
        return <div>
          <button type="button" onClick={this.loadUserRegistrationRescuer}>User Registration</button>
        </div>;

      case "ROLE_VOLUNTEER":
        return <div>
          <button type="button" onClick={this.loadUserRegistrationVolunteer}>User Registration</button>
        </div>;

      default:
        console.log("Role " + role + " is not in handler");
        return null;
    }
  }

  render() {    
    const element = 
    <div>
      <h2>Dashboard: </h2>
      
      <div id="buttons">
        <button type="button" onClick={Logout}>Logout!</button>
        {roleData.data.map(role => this.renderclonegido(role))}
      </div>

      <div>
        <h3>Request: </h3>
        <div id="requests"></div>
      </div>

      <div>
        <h3>Accepted: </h3>
        <div id="accepted"></div>
      </div>
      
    </div>;
    return element;
  }
}

export default Dashboard;