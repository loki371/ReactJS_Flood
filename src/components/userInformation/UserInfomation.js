import React from 'react';
import Constant from "../../constant";
import Axios from "axios";

import UserData from '../app/UserData';

const { tokenData, usernameData, roleData, wardData, districtData, provinceData } = UserData();

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  for (var i of phone) {
    if (i < '0' || i > '9')
      return false;
  }
  return phone.length===10 || phone.length=== 11;
}

class UserInfomation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      showUserData: 0,

    }

  }

  componentDidMount() {
    Axios.defaults.headers.common['Authorization'] = tokenData.data;

    var url = Constant.userInformation + "/" + usernameData.data;
    console.log("url = ", url);
    Axios.get(
      url
    ).then((res) => {
      console.log("result RegisData: ", res.data.data);
      this.setState({
        showUserData: 1,
        firstname: res.data.data.firstname,
        lastname: res.data.data.lastname,
        phone: res.data.data.phone,
        email: res.data.data.email,
      });
    });
  }

  sendCapNhatUserInfomation() {
    if (this.state.firstname == "") {
      alert("Xin hãy điền Tên");
      return;
    }

    if (this.state.lastname == "") {
      alert("Xin hãy điền Họ");
      return;
    }

    if (!validateEmail(this.state.email)) {
      alert("Xin hãy nhập lại email");
      return;
    }

    if (!validatePhone(this.state.phone)) {
      alert("Số điện thoại chưa hợp lệ, xin hãy nhập lại!");
      return;
    }

    var url = Constant.userInformation + "/" + usernameData.data;

    console.log("url = " + url);

    console.log("Firstname " + this.state.firstname);
    console.log("Lastname " + this.state.lastname);
    console.log("Phone " + this.state.phone);
    console.log("Email " + this.state.email);
    console.log("Role " + roleData.data);

    Axios.defaults.headers.common['Authorization'] = tokenData.data;
    Axios({
      method: 'post',
      url: url,
      data: {
        username: usernameData.data,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        phone: this.state.phone,
        email: this.state.email,
        role: roleData.role,
        password: "123456"
      }}
    ).then((res) => {
      console.log("result: ", res.data.data);
      alert("Cập nhật thông tin thành công");
    });
  }

  
  handleChangeFirstname(event) {
    this.setState({
        firstname: event.target.value
    });
  }

  handleChangeLastname(event) {
      this.setState({
          lastname: event.target.value
      });
  }

  handleChangePhone(event) {
      this.setState({
          phone: event.target.value
      });
  }

  handleChangeEmail(event) {
      this.setState({
          email: event.target.value
      });
  }

  render() {

    return (
      
      this.state.showUserData == 1 ?

      <div style={{marginLeft: '20px', margin:"20px", marginTop: "5px", height: "500px", textAlign: "center"}}>
        <h5 style={{width: "100%", textAlign: "center", fontWeight: "bold"}}>Thông tin người dùng</h5>
        
        <div style={{width: "500px", textAlign: "left", height: "70px", marginTop: "20px", borderStyle:"groove", borderRadius: "5px", height: "350px", marginLeft:"auto", marginRight: "auto"}} class="row">
            <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px"}}>
                <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Username:</h6>
                <div class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}}>{usernameData.data}</div>
            </div>
            <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px"}}>
                <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Vai trò:</h6>
                <div class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}}>{roleData.data[0].split('_')[1]}</div>
            </div>
            <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px"}}>
                <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Tên:</h6>
                <input type="text" class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}} 
                  value={this.state.firstname} onChange={e => this.handleChangeFirstname(e)}></input>
            </div>
            <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px"}}>
                <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Họ:</h6>
                <input type="text" class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}}
                  value={this.state.lastname} onChange={e => this.handleChangeLastname(e)}></input>
            </div>
            <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px"}}>
                <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Số điện thoại:</h6>
                <input type="text" class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}}
                  value={this.state.phone} onChange={e => this.handleChangePhone(e)}></input>
            </div>
            <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px", paddingBottom: "20px"}}>
                <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Email:</h6>
                <input type="text" class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}}
                  value={this.state.email} onChange={e =>this.handleChangeEmail(e)}></input>
            </div>
        </div>
        <div style = {{textAlign: "center"}}>
          <button type="button" class="btn col col-sm-1 btn-success" style={{width:"300px", height: "50px", marginRight: "20px", marginLeft: "20px", marginTop: "8px", fontWeight: "bold"}} 
                      onClick={() => this.sendCapNhatUserInfomation()}>Cập nhật thông tin</button>
        </div>
      </div> 
      
      : <div/>
      
    );
  }
}

export default UserInfomation;