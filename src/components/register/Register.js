import React, { useState } from 'react';

import './Login.css';
import Constant from "../../constant";
import Axios from "axios";

function dangnhap() {
  window.location.replace(Constant.login_client);
}

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

var roles = ["role_authority"];

export default function Register() {

  const [username, setUserName] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  

  function changeRole(value) {
    console.log("onChange");
    if (value == "AUTHORITY") {
      roles = ["role_authority"];
    } else {
      roles = ["role_volunteer"];
    }
    console.log("role = ", roles);
  }

  function sendRegister (){
    console.log("username: ", username);
    console.log("firstname: ", firstname);
    console.log("lastname: ", lastname);
    console.log("phone: ", phone);
    console.log("email: ", email);
    console.log("password: ", password);
    console.log("role: ", roles);
    
    if (username == "") {
      alert("Xin hãy điền Username");
      return;
    }

    if (firstname == "") {
      alert("Xin hãy điền Tên");
      return;
    }

    if (lastname == "") {
      alert("Xin hãy điền Họ");
      return;
    }

    if (!validateEmail(email)) {
      alert("Xin hãy nhập lại email");
      return;
    }

    if (!validatePhone(phone)) {
      alert("Số điện thoại chưa hợp lệ, xin hãy nhập lại!");
      return;
    }

    var url = Constant.register_server;
    Axios({
      method: 'post',
      url: url,
      data: {
        username: username,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        role: roles,
        password: password
      }
    }).then(() => {
      window.location.replace(Constant.login_client);
    }).catch((error) => {
      alert("Thông tin Username hoặc Email đã được sử dụng rồi, hãy dùng tên và email khác!");
    });
  }

  return(
    <div class="mx-auto" style={{width: '500px', marginBottom: '150px'}}>
      <div class="container">
        <div class="row justify-content-md-center">
          <h1 class = "text-center">Cứu nạn Miền Trung</h1>

          <div style={{width: '600px'}} class = "text-center">

                <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px"}}>
                  <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Username:</h6>
                  <input type="text" class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}} 
                  onChange={e => setUserName(e.target.value)}></input>
                </div>

                <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px", paddingBottom: "20px"}}>
                  <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Password:</h6>
                  <input type="password" class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}}
                  onChange={e => setPassword(e.target.value)}></input>
                </div>

                <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px"}}>
                  <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Vai trò:</h6>
                  <select type="text" class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}} 
                  onChange={e => changeRole(e.target.value)}>
                      <option style={{textAlign: "center"}}>AUTHORITY</option>
                      <option style={{textAlign: "center"}}>VOLUNTEER</option>
                  </select>
                </div>

                <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px"}}>
                  <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Tên:</h6>
                  <input type="text" class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}} 
                  onChange={e => setFirstname(e.target.value)}></input>
                </div>

                <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px"}}>
                  <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Họ:</h6>
                  <input type="text" class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}}
                  onChange={e => setLastname(e.target.value)}></input>
                </div>

                <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px"}}>
                  <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Số điện thoại:</h6>
                  <input type="text" class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}}
                  onChange={e => setPhone(e.target.value)}></input>
                </div>

                <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px", paddingBottom: "20px"}}>
                  <h6 class="col-4 list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Email:</h6>
                  <input type="text" class="col-6 list-group" style={{marginTop: "17px", height: "30px", textAlign: "left", fontWeight:"bold"}}
                  onChange={e => setEmail(e.target.value)}></input>
                </div>
                
            <div style={{marginTop: '10px'}}>
              <button type="submit" class="btn btn-success" style={{width: '200px', fontWeight: "bold"}} onClick={() => sendRegister()}>Đăng ký tài khoản</button>
            </div>

          </div>
        </div>
      </div>

      <div style={{width: '300px'}} class = "text-center mx-auto">
        <button class="btn btn-secondary" style={{width: '150px', marginTop:'50px', fontWeight: "bold"}} onClick={() => dangnhap()}>Đăng nhập</button>
      </div>
    </div>
  )
}
