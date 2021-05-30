import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from '../dashboard/Dashboard';
import Login from '../login/Login';
import UserData from './UserData';
import Logout from "../logout/Logout";
import ReactDOM from 'react-dom';


const { tokenData } = UserData();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRequestAccept : false,
      showNoiLamViec: false,
      showUserInfo: false
    }
  }

  loadRequestAccept() {
    this.setState({
      showRequestAccept : true,
      showNoiLamViec: false,
      showUserInfo: false
    });
  }

  loadNoiLamViec() {
    this.setState({
      showRequestAccept : false,
      showNoiLamViec: true,
      showUserInfo: false
    });
  }

  loadUserInfo() {
    this.setState({
      showRequestAccept : false,
      showNoiLamViec: false,
      showUserInfo: true
    });
  }

  render() {
    //if(!tokenData.data) {
    //  return <Login/>;
    //}

    return (
      <div className="wrapper">

        <BrowserRouter>
          <Switch>
            
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/dashboard/authorities">
              <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{margin: "0px", paddingTop: "25px", paddingBottom: "25px", paddingLeft: "5px", paddingRight: "5px"}}>
                
                <a class="navbar-brand" href="#">Cứu Nạn Lũ Lụt</a>
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mr-auto">

                    <li class="nav-item">
                      <a class="nav-link" href="#">Tên user: {tokenData.usernameData}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Vai trò: {tokenData.roleData}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Xã: {tokenData.wardData}</a>
                    </li>
                  </ul>

                </div>

                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={Logout}>Đăng xuất</button>

              </nav>

              <div class="row" style={{margin: "0px", paddingTop: "5px", paddingBottom: "5px", paddingLeft: "0px", paddingRight: "0px"}}>

                <div class = "col-2 btn-group-vertical" style={{height:'200px'}}>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadRequestAccept()}>Xet duyet danh sach</button>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadRequestAccept()}>Tinh trang lu lut</button>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadNoiLamViec()}>Dang ky xa lam viec</button>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadUserInfo()}>Thong tin ca nhan</button>
                </div>

                <div class = "col-8" id="mainboard">
                  {this.state.showRequestAccept?<Dashboard/>:null}
                </div>
              </div>
            </Route>

            <Route path="/dashboard/volunteers">
              <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{margin: "0px", paddingTop: "25px", paddingBottom: "25px", paddingLeft: "5px", paddingRight: "5px"}}>
                
                <a class="navbar-brand" href="#">Cứu Nạn Lũ Lụt</a>
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mr-auto">

                    <li class="nav-item">
                      <a class="nav-link" href="#">Tên user: {tokenData.usernameData}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Vai trò: {tokenData.roleData}</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Xã: {tokenData.wardData}</a>
                    </li>
                  </ul>

                </div>

                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={Logout}>Đăng xuất</button>

              </nav>

              <div class="row" style={{margin: "0px", paddingTop: "5px", paddingBottom: "5px", paddingLeft: "0px", paddingRight: "0px"}}>

                <div class = "col-2 btn-group-vertical" style={{height:'200px'}}>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadRequestAccept()}>Xet duyet danh sach</button>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadNoiLamViec()}>Dang ky xa lam viec</button>
                  <button type="button" class="btn btn-secondary" onClick={() => this.loadUserInfo()}>Thong tin ca nhan</button>
                </div>

                <div class = "col-8" id="mainboard">
                  {this.state.showRequestAccept?<Dashboard/>:null}
                </div>
              </div>
            </Route>

            <Route>
              <Login />
            </Route>
        
          </Switch>
        </BrowserRouter>

        <div style={{alignItems: 'center', color: 'white', margin: '0px', padding: '20px'}} class="bg-primary">
          <div class="col">
            <div>Trang web Cứu nạn Lũ lụt</div>
            <div>Email 1712210@student.hcmus.edu.vn</div>
            <div>Phone 0935624754</div>
          </div>
        </div>
      
      </div>
    );
  }
}

export default App;