import React from 'react';
import Constant from '../../constant'
import Logout from "../logout/Logout"
import UserData from "../app/UserData"
import Axios from "axios";

const userData = UserData();
var roleData = userData.roleData;
var tokenData = userData.tokenData;
var usernameData = userData.usernameData;

var userRegistrationVolunteer;

var userRegistrationAuthority;
// {
//   "id": 5,
//   "name": "xuan vy nguyen",
//   "longitude": 106.682,
//   "latitude": 10.7623,
//   "ward": {
//       "id": "00571",
//       "name": "Xã Dương Xá",
//       "type": "Xã"
//   },
//   "phone": "0935624754",
//   "numPerson": 0,
//   "savedBy": null,
//   "createBy": null,
//   "commentList": [],
//   "estate": "STATE_EMERGENCY"
// }
var authorityRegistration;
// {
//   "username": "anhtrai3role2",
//   "locationType": "ward",
//   "locationId": "00571",
//   "rejected": false
// },
var volunteerRegistration;
var rescuerRegistration;

var actionType = {
  GET_USER_RES_VOLU : -1,
  GET_USER_RES_AUTH : 0,
  GET_AUTH_RES : 1,
  GET_VOLU_RES : 2,
  GET_RESC_RES : 3
}

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

function loadAtRegistration(container, url, type) {
  Axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': tokenData.data
    },
  }).then((res) => {
    
    console.log(res.data.data);
    container = res.data.data;

  })
  .catch(function() {
    console.log("error in get resource with token -> login again");
    tokenData.delete();
    usernameData.delete();
    roleData.delete();

    return false;
  });
}

function loadCustomRegistration(container, url, type) {
  Axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': tokenData.data
    },
  }).then((res) => {
    
    console.log(res.data.data);
    container = res.data.data;

  })
  .catch(function() {
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

  componentDidMount() {
    if (!checkValidToken()) {
      this.props.history.push(Constant.login_client);
    }
  }

  componentWillUnmount() {}

  loadUserRegistrationAuthority(){
    console.log("loadUserRegistration Authority");
    loadAtRegistration(userRegistrationAuthority, Constant.user_registration, actionType.GET_USER_RES_AUTH);
  }

  loadUserRegistrationVolunteer(){
    console.log("loadUserRegistration Volunteer");
    loadCustomRegistration(userRegistrationVolunteer, Constant.user_registration, actionType.GET_USER_RES_VOLU);
  }

  loadAuthorityRegistrationAuthority(){
    console.log("loadUserRegistration Volunteer");
    loadCustomRegistration(authorityRegistration, Constant.auth_location_regis, actionType.GET_AUTH_RES);
  }

  loadVolunteerRegistrationAuthority() {
    console.log("loadVolunteerRegistration Authority");
    loadCustomRegistration(volunteerRegistration, Constant.volu_location_regis, actionType.GET_VOLU_RES);
  }

  loadRescuerRegistrationAuthority() {
    console.log("loadRescuerRegistration Authority");
    loadCustomRegistration(rescuerRegistration, Constant.resc_location_regis, actionType.GET_RESC_RES);
  }

  renderclonegido(role) {
    switch(role) {
      case "ROLE_AUTHORITY":
        return <div>
          <button type="button" onClick={this.loadUserRegistrationAuthority}>User Registration</button>
          <button type="button" onClick={this.loadAuthorityRegistrationAuthority}>Authority Registration</button>
          <button type="button" onClick={this.loadVolunteerRegistrationAuthority}>Volunteer Registration</button>
          <button type="button" onClick={this.loadRescuerRegistrationAuthority}>Rescuer Registration</button>
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