import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../dashboard/Dashboard';
import Login from '../login/Login';
import Register from '../register/Register';

import UserData from './UserData';
import Logout from "../logout/Logout";
import Ward from "../wardRegis/Ward";
import FloodState from "../floodState/FloodState";
import UserInformation from "../userInformation/UserInfomation";

const { tokenData, usernameData, roleData, wardData } = UserData();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRequestAccept : false,
      showNoiLamViec: false,
      showUserInfo: false,
      showFloodState: false,
      userName: '',
      role: '',
      ward: ''
    }

    if (tokenData.data !== null) {
      this.state = {
        showRequestAccept : false,
        showNoiLamViec: false,
        showUserInfo: false,
        userName: usernameData.data,
        role: roleData.data[0].split('_')[1],
        ward: wardData.data
      };
      console.log("wardData = ", wardData.data);
    }
  }

  loadRequestAccept() {
    this.setState({
      showRequestAccept : true,
      showNoiLamViec: false,
      showUserInfo: false,
      showFloodState: false,
    });
  }

  loadNoiLamViec() {
    this.setState({
      showRequestAccept : false,
      showNoiLamViec: true,
      showUserInfo: false,
      showFloodState: false
    });
  }

  loadUserInfo() {
    this.setState({
      showRequestAccept : false,
      showNoiLamViec: false,
      showUserInfo: true,
      showFloodState: false
    });
  }

  loadTinhTrangLuLut() {
    this.setState({
      showRequestAccept : false,
      showNoiLamViec: false,
      showUserInfo: false,
      showFloodState: true
    });
  }

  render() {
    console.log("roleData = " + roleData.data);

    var listURL = window.location.href.split("/");
    if(!tokenData.data && listURL[listURL.length-1] != "register") {
      return <Login/>;
    }

    return (
      <div className="wrapper">

        <BrowserRouter>
          <Switch>
            
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/dashboard/authorities">
              <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{margin: "0px", paddingTop: "25px", paddingBottom: "25px", paddingLeft: "5px", paddingRight: "5px"}}>
                
                <a class="navbar-brand" href="#">C???u N???n L?? L???t</a>
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mr-auto">

                    <li class="nav-item">
                      <a class="nav-link" href="#">T??n user: {this.state.userName}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Vai tr??: {this.state.role}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">N??i l??m vi???c: {this.state.ward != null ? this.state.ward.name : "Ch??a c??"}</a>
                    </li>
                  </ul>

                </div>

                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={Logout}>????ng xu???t</button>

              </nav>

              <div class="row" style={{margin: "0px", paddingTop: "5px", paddingBottom: "5px", paddingLeft: "0px", paddingRight: "0px", width:'100%'}}>

                <div class = "col-2 btn-group-vertical" style={{height:'200px', marginTop: "30px"}}>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadRequestAccept()}>X??t duy???t danh s??ch</button>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadTinhTrangLuLut()}>T??nh tr???ng l?? l???t</button>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadNoiLamViec()}>????ng k?? ?????a ph????ng</button>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadUserInfo()}>Th??ng tin c?? nh??n</button>
                </div>

                <div class = "col" id="mainboard" style={{width:'100%', height: "800px"}} >
                  {this.state.showRequestAccept?<Dashboard/>:null}
                  {this.state.showNoiLamViec?<Ward/>:null}
                  {this.state.showFloodState?<FloodState/>:null}
                  {this.state.showUserInfo?<UserInformation/>:null}
                </div>
              </div>
              
            </Route>

            <Route path="/dashboard/volunteers">
              <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{margin: "0px", paddingTop: "25px", paddingBottom: "25px", paddingLeft: "5px", paddingRight: "5px"}}>
                
                <a class="navbar-brand" href="#">C???u N???n L?? L???t</a>
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mr-auto">

                    <li class="nav-item">
                      <a class="nav-link" href="#">T??n user: {this.state.userName}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Vai tr??: {this.state.role}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">N??i l??m vi???c: {this.state.ward != null ? this.state.ward.name : "Ch??a c??"}</a>
                    </li>
                  </ul>

                </div>

                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={Logout}>????ng xu???t</button>

              </nav>

              <div class="row" style={{margin: "0px", paddingTop: "5px", paddingBottom: "5px", paddingLeft: "0px", paddingRight: "0px"}}>

                <div class = "col-2 btn-group-vertical" style={{height:'150px', marginTop: "30px"}}>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadRequestAccept()}>X??t duy???t danh s??ch</button>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadNoiLamViec()}>????ng k?? ?????a ph????ng</button>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadUserInfo()}>Th??ng tin c?? nh??n</button>
                </div>

                <div class = "col" id="mainboard" style={{width:'100%', height: "800px"}}>
                  {this.state.showRequestAccept?<Dashboard/>:null}
                  {this.state.showNoiLamViec?<Ward/>:null}
                  {this.state.showUserInfo?<UserInformation/>:null}
                </div>
              </div>

              {/* <div style={{alignItems: 'center', color: 'white', margin: '0px', padding: '20px'}} class="bg-primary">
                <div class="col">
                  <div>Trang web C???u n???n L?? l???t</div>
                  <div>Email 1712210@student.hcmus.edu.vn</div>
                  <div>Phone 0935624754</div>
                </div>
              </div> */}
            </Route>

            <Route>
              <Login />
            </Route>
        
          </Switch>
        </BrowserRouter>

        <div style={{alignItems: 'center', color: 'white', marginTop: '0px', padding: '20px'}} class="bg-primary">
            <div class="col">
              <div>Trang web C???u n???n L?? l???t</div>
              <div>Email 1712210@student.hcmus.edu.vn</div>
              <div>Phone 0935624754</div>
            </div>
          </div>

        </div>
    );
  }
}

export default App;