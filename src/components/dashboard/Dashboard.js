import React from 'react';
import './Dashboard.css';

import Constant from '../../constant'
import UserData from "../app/UserData"
import Axios from "axios";
import UserItem from './UserItem';
import RoleType from '../app/RoleType';

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
    this.userRole = null;
    this.itemRole = null;
  }

  componentDidMount() {
    // if (!checkValidToken()) {
    //   this.props.history.push(Constant.login_client);
    // }
  }

  componentWillUnmount() {}

  loadRegistrationForAuthority(dataRequest, dataAccept, url) {
    Axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenData.data
      },
    }).then((res) => {
      
      console.log("data received: ", res.data.data);
      res.data.data.map(
        item => {
          if (item.estate === "STATE_UNAUTHENTICATED" || item.estate === null) {
            dataRequest.push(item);
            console.log("loading : item name = ", item.name, " -> request");
          } else if (item.estate === "STATE_AUTHENTICATED") {
            dataAccept.push(item);
            console.log("loading : item name = ", item.name, " -> accepted");
          }
        }
      )

      this.setState({
        dataAccept: dataAccept,
        dataRequest: dataRequest
      });
  
    })
    .catch(function() {
      console.log("error in get resource with token -> login again");
      //tokenData.delete();
      //usernameData.delete();
      //roleData.delete();

      // this.props.history.push(Constant.login_client);
  
      return false;
    });
  }

  loadRegistrationForVolunteer(dataRequest, dataAccept, url, type) {
    Axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenData.data
      },
    }).then((res) => {
  
      console.log("data received: ", res.data.data);
      res.data.data.map(
        item => {
          if (item.estate === "STATE_DANGER") {
            dataRequest.push(item);
            console.log("loading : item name = ", item.name, " -> request");
          } else if (item.estate === "STATE_EMERGENCY") {
            dataAccept.push(item);
            console.log("loading : item name = ", item.name, " -> accepted");
          }
        }
      );

      this.setState({
        dataAccept: dataAccept,
        dataRequest: dataRequest
      });
      
    })
    .catch(function() {
      console.log("error in get resource with token -> login again");
      //tokenData.delete();
      //usernameData.delete();
      //roleData.delete();
  
      //this.props.history.push(Constant.login_client);
  
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
    this.userRole = RoleType.AUTHORITY;
    this.itemRole = RoleType.USER;
    this.loadRegistrationForAuthority(dataAccept, dataRequest, Constant.user_registration);
  }

  loadUserRegistrationVolunteer(){
    this.setState({
      dataAccept : [],
      dataRequest : []
    });
    
    var dataAccept = [];
    var dataRequest = [];

    this.userRole = RoleType.VOLUNTEER;
    this.itemRole = RoleType.USER;

    console.log("loadUserRegistration Volunteer");
    this.loadRegistrationForVolunteer(dataAccept, dataRequest, Constant.user_registration);
  }

  loadAuthorityRegistrationAuthority(){
    this.setState({
      dataAccept : [],
      dataRequest : []
    });
    var dataAccept = [];
    var dataRequest = [];

    this.userRole = RoleType.AUTHORITY;
    this.itemRole = RoleType.AUTHORITY;

    console.log("loadAuthorityRegistration Authority");
    this.loadRegistrationForAuthority(dataAccept, dataRequest, Constant.auth_location_regis);
  }

  loadVolunteerRegistrationAuthority() {
    this.setState({
      dataAccept : [],
      dataRequest : []
    });
    var dataAccept = [];
    var dataRequest = [];

    this.userRole = RoleType.AUTHORITY;
    this.itemRole = RoleType.VOLUNTEER;

    console.log("loadVolunteerRegistration Authority");
    this.loadRegistrationForAuthority(dataAccept, dataRequest, Constant.volu_location_regis);
  }

  loadRescuerRegistrationAuthority() {
    this.setState({
      dataAccept : [],
      dataRequest : []
    });
    var dataAccept = [];
    var dataRequest = [];

    this.userRole = RoleType.AUTHORITY;
    this.itemRole = RoleType.RESCUER;

    console.log("loadRescuerRegistration Authority");
    this.loadRegistrationForAuthority(dataAccept, dataRequest, Constant.resc_location_regis);
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
      <div id="buttons">
        {/* {roleData.data.map(role => this.renderclonegido(role))} */}
      </div>

      <div class="row">
        <div class="column">
          <h3>Request: </h3>
          <div id="requests">{ dataRequest.map(item => <UserItem element={item} dashboard={this} userRole={this.userRole} itemRole={this.itemRole}/>) }</div>
        </div>

        <div class="column">
          <h3>Accepted: </h3>
          <div id="accepted">{ dataAccept.map(item => <UserItem element={item} dashboard={this} userRole={this.userRole} itemRole={this.itemRole}/>) }</div>
        </div>
      </div>
      
    </div>;

    return element;
  }
}

export default Dashboard;

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