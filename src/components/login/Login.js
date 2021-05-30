import React, { useState } from 'react';

import './Login.css';
import UserData from "../app/UserData";
import Constant from "../../constant";

async function loginUser(credentials) {
  return fetch(Constant.login_server, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login() {
  const { tokenData, usernameData, roleData } = UserData();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  if (tokenData.data) {
    for (var role of roleData.data) {
      if (role === "ROLE_AUTHORITY") {
        window.location.replace(Constant.authority_client);
      
        return <div style = {{height:"10000px"}}></div>;
      }
    else {
        window.location.replace(Constant.volunteer_client);

        return <div style = {{height:"10000px"}}></div>;
      }
    }
  }

  const handleSubmit = async e => {

    e.preventDefault();
    const data = await loginUser({
      username,
      password
    });
    console.log(data);

    if (data.tokenType === "Bearer") {

      tokenData.set(data.accessToken);
      usernameData.set(data.username);
      roleData.set(data.roles);
      
      console.log(data.roles);
      
      for (var role of data.roles) {
        if (role === "ROLE_AUTHORITY") {
          window.location.replace(Constant.authority_client);
          break;
        }
      else {
          window.location.replace(Constant.volunteer_client);
          break;
        }
      }
      return;
      
    } else {

      console.log("login failed because of usernamePass");
      alert("Username or Password wrong");
    }
  }

  return(
    <div class="mx-auto" style={{width: '500px', marginBottom: '150px'}}>
      <div class="container">
        <div class="row justify-content-md-center">
          <h1 class = "text-center">Cứu nạn Miền Trung</h1>
          <form onSubmit={handleSubmit} style={{width: '300px'}} class = "text-center">
            <label class="row justify-content-md-center" style={{marginTop: '10px'}}>
              <p class="">Username</p>
              <input type="text" onChange={e => setUserName(e.target.value)} class = "text-center input-radius"/>
            </label>
            <label class="row justify-content-md-center" style={{marginTop: '10px'}}>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)} class = "text-center input-radius"/>
            </label>
            <div style={{marginTop: '10px'}}>
              <button type="submit" class="btn btn-success" style={{width: '150px'}}>Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>

      <div style={{width: '300px'}} class = "text-center mx-auto">
        <button class="btn btn-primary" style={{width: '200px', marginTop:'50px'}}>Đăng ký tài khoản</button>
      </div>
    </div>
  )
}
