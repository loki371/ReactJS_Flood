import React, { useState } from 'react';

import './Login.css';
import UserData from "../app/UserData";
import Constant from "../../constant";
import Axios from "axios";

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
  const { tokenData, usernameData, roleData, wardData, districtData, provinceData } = UserData();

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
    if (Constant.isTest) {
      tokenData.set("123");
      usernameData.set("Testing 1");
      roleData.set("ROLE_AUTHORITY");
      wardData.set("Xa Hoa Nhon");
      districtData.set("Huyen Hoa Vang");
      provinceData.set("TP Da Nang");
      window.location.replace(Constant.authority_client);
      return;
    }

    e.preventDefault();
    const data = await loginUser({
      username,
      password
    });
    console.log(data);

    if (data.tokenType === "Bearer") {
      
      var urlGetWard;
      for (var role of data.roles) {
        if (role === "ROLE_USER") {
          alert("Chúng tôi không phục vụ bạn tại đây");
          return;
        }
        if (role === "ROLE_VOLUNTEER") {
          urlGetWard = Constant.get_ward_volunteer + "/" + data.username;
          break;
        }
        if (role === "ROLE_AUTHORITY") {
          urlGetWard = Constant.get_ward_authority + "/" + data.username;
          break;
        }
      }

      tokenData.set(data.accessToken);
      usernameData.set(data.username);
      roleData.set(data.roles);

      Axios.defaults.headers.common['Authorization'] = tokenData.data;
      Axios.get(
        urlGetWard
      ).then((res) => {
        console.log("result getWard: ", res);
        wardData.set(res.data.ward);
        districtData.set(res.data.district);
        provinceData.set(res.data.province);
      });
      
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
