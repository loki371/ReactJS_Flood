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
      dataAccept : [],
      title: ""
    }
    this.userRole = null;
    this.itemRole = null;
  }

  componentDidMount() {
    if (!checkValidToken()) {
      this.props.history.push(Constant.login_client);
    }
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
          if (item.username != usernameData.data) {
            if (item.eState === "STATE_UNAUTHENTICATED" || item.eState === null) {
              dataRequest.push(item);
              console.log("loading : item name = ", item.name, " -> request");
            } else if (item.eState === "STATE_AUTHENTICATED") {
              dataAccept.push(item);
              console.log("loading : item name = ", item.name, " -> accepted");
            }
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
    console.log("load registration for volunteer")
    Axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenData.data
      },
    }).then((res) => {
  
      console.log("data received: ", res.data.data);
      res.data.data.map(
        item => {
          if (item.eState === "STATE_DANGER") {
            dataRequest.push(item);
            console.log("loading : item name = ", item.name, " -> request");
          } else if (item.eState === "STATE_EMERGENCY") {
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
    this.setState({
      title : " \\ Danh sách Nơi cần cứu"
    })
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
    this.setState({
      title : " \\ Danh sách Nơi cần cứu"
    })
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
    this.setState({
      title : " \\ Đăng ký Chính quyền"
    })
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
    this.setState({
      title : " \\ Đăng ký Tình nguyện viên"
    })
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
    this.setState({
      title : " \\ Đăng ký Đội cứu nạn"
    })
  }

  renderclonegido(role) {
    switch(role) {
      case "ROLE_AUTHORITY":
        return <div style={{marginBottom:"2px"}} >
          <button type="button" class="btn btn-outline-primary" style={{marginRight:"2px", fontWeight:"bold"}} onClick={()=>this.loadUserRegistrationAuthority()}>Nơi cần cứu</button>
          <button type="button" class="btn btn-outline-secondary" style={{marginRight:"2px", fontWeight:"bold" }} onClick={()=>this.loadAuthorityRegistrationAuthority()}>Chính quyền</button>
          <button type="button" class="btn btn-outline-warning" style={{marginRight:"2px", fontWeight:"bold"}} onClick={()=>this.loadVolunteerRegistrationAuthority()}>Tình nguyện viên</button>
          <button type="button" class="btn btn-outline-info" style={{marginRight:"2px", fontWeight:"bold"}} onClick={()=>this.loadRescuerRegistrationAuthority()}>Đội Cứu nạn</button>
        </div>;

      case "ROLE_VOLUNTEER":
        return <div>
          <button type="button" class="btn btn-outline-primary" style={{marginRight:"2px", fontWeight:"bold"}} onClick={()=>this.loadUserRegistrationVolunteer()}>Nơi cần cứu</button>
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
      <h5 style={{width: "100%", textAlign: "center", fontWeight: "bold"}}> Xét duyệt danh sách <span style={{fontWeight:"normal"}}>{this.state.title}</span></h5>
      <div id="buttons">
        {roleData.data.map(role => this.renderclonegido(role))}
      </div>

      <div class="row" style={{marginTop:'10px', height: '700px', overflow: 'auto'}}>
        <div class="col" style={{padding:"2px", borderStyle: 'groove',  borderRadius: '4px', backgroundColor:'rgb(176, 196, 222)'}}>
          <h6 class = "bg-danger" style={{textAlign:"center", width:'100%', height: '30px',  paddingTop: "3px", color:'white', borderRadius: '4px'}}>Danh sách yêu cầu: </h6>
          <div id="requests">
            { 
              dataRequest.map((item, index) => 
                <UserItem
                  element={item} dashboard={this} userRole={this.userRole} itemRole={this.itemRole} key={item.id + "_" + item.username} />
                  ) 
            }
          </div>
        </div>

        <div class="col" style={{padding:"2px", borderStyle: 'groove',  borderRadius: '4px', backgroundColor:'rgb(176, 196, 222)'}}>
          <h6 class="bg-success" style={{textAlign:"center", width:'100%', height: '30px', paddingTop: "3px", color:'white', borderRadius: '4px'}}>Danh sách xác nhận: </h6>
          <div id="accepted">
            { 
              dataAccept.map((item, index) => 
                <UserItem
                  element={item} dashboard={this} userRole={this.userRole} itemRole={this.itemRole} key={item.id + "_" + item.username}/>
                  ) 
            }
          </div>
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