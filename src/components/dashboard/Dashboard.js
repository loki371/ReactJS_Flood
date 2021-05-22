import React from 'react';
import './Dashboard.css';

import Constant from '../../constant'
import Logout from "../logout/Logout"
import UserData from "../app/UserData"
import Axios from "axios";
import UserItem from './UserItem';

const userData = UserData();
var roleData = userData.roleData;
var tokenData = userData.tokenData;
var usernameData = userData.usernameData;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRequest : [],
      dataAccept : []
    }
  }

  componentDidMount() {
    if (!checkValidToken()) {
      this.props.history.push(Constant.login_client);
    }
  }

  componentWillUnmount() {}

  loadAtRegistration(dataRequest, dataAccept, url, type) {
    Axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenData.data
      },
    }).then((res) => {
      
      console.log("data received: ", res.data.data);
      res.data.data.map(
        item => {
          if (item.estate === "STATE_UNAUTHENTICATED")
            dataRequest.push(item);
          else 
            dataAccept.push(item);
        }
      )

      this.setState({
        dataAccept: dataAccept,
        dataRequest: dataRequest
      });
  
    })
    .catch(function() {
      console.log("error in get resource with token -> login again");
      tokenData.delete();
      usernameData.delete();
      roleData.delete();
  
      return false;
    });
  }

  loadUserRegistrationAuthority(){
    console.log("loadUserRegistration Authority");
    
    this.setState({
      dataAccept : [],
      dataRequest : []
    });
    var dataAccept = [];
    var dataRequest = [];
    this.loadAtRegistration(dataAccept, dataRequest, Constant.user_registration, actionType.GET_USER_RES_AUTH);
  }

  loadUserRegistrationVolunteer(){
    var dataAccept = this.state.dataAccept;
    var dataRequest = this.state.dataRequest;
    console.log("loadUserRegistration Volunteer");
    loadCustomRegistration(dataAccept, dataRequest, Constant.user_registration, actionType.GET_USER_RES_VOLU);
  }

  loadAuthorityRegistrationAuthority(){
    var dataAccept = this.state.dataAccept;
    var dataRequest = this.state.dataRequest;
    console.log("loadUserRegistration Volunteer");
    loadCustomRegistration(dataAccept, dataRequest, Constant.auth_location_regis, actionType.GET_AUTH_RES);
  }

  loadVolunteerRegistrationAuthority() {
    var dataAccept = this.state.dataAccept;
    var dataRequest = this.state.dataRequest;
    console.log("loadVolunteerRegistration Authority");
    loadCustomRegistration(dataAccept, dataRequest, Constant.volu_location_regis, actionType.GET_VOLU_RES);
  }

  loadRescuerRegistrationAuthority() {
    var dataAccept = this.state.dataAccept;
    var dataRequest = this.state.dataRequest;
    console.log("loadRescuerRegistration Authority");
    loadCustomRegistration(dataAccept, dataRequest, Constant.resc_location_regis, actionType.GET_RESC_RES);
  }

  renderclonegido(role) {
    switch(role) {
      case "ROLE_AUTHORITY":
        return <div>
          <button type="button" onClick={()=>this.loadUserRegistrationAuthority()}>User Registration</button>
          <button type="button" onClick={()=>this.loadAuthorityRegistrationAuthority()}>Authority Registration</button>
          <button type="button" onClick={()=>this.loadVolunteerRegistrationAuthority()}>Volunteer Registration</button>
          <button type="button" onClick={()=>this.loadRescuerRegistrationAuthority()}>Rescuer Registration</button>
        </div>;

      case "ROLE_VOLUNTEER":
        return <div>
          <button type="button" onClick={()=>this.loadUserRegistrationVolunteer()}>User Registration</button>
        </div>;

      default:
        console.log("Role " + role + " is not in handler");
        return null;
    }
  }

  render() {    
    var dataAccept = this.state.dataAccept;
    var dataRequest = this.state.dataRequest;

    const element = 
    <div>
      <h2>Dashboard: </h2>
      
      <div id="buttons">
        <button type="button" onClick={Logout}>Logout!</button>
        {roleData.data.map(role => this.renderclonegido(role))}
      </div>

      <div class="row">
        <div class="column">
          <h3>Request: </h3>
          <div id="requests">{ dataRequest.map(item => <UserItem element={item} />) }</div>
        </div>

        <div class="column">
          <h3>Accepted: </h3>
          <div id="accepted">{ dataAccept.map(item => <UserItem element={item} />) }</div>
        </div>
      </div>
      
    </div>;
    return element;
  }
}

export default Dashboard;

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

function loadCustomRegistration(dataRequest, dataAccept, url, type) {
  Axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': tokenData.data
    },
  }).then((res) => {

    console.log(res.data.data);

  })
  .catch(function() {
    console.log("error in get resource with token -> login again");
    tokenData.delete();
    usernameData.delete();
    roleData.delete();

    return false;
  });
}