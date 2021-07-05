import React, { useState } from 'react';

import './Login.css';
import UserData from "../app/UserData";
import Constant from "../../constant";
import Axios from "axios";

const locationData = require('../../location.json');

const quanList = [];
for (var item of locationData["quan"]) quanList.push(item);

const tinhList = [];
for (var item of locationData["tinh"]) tinhList.push(item);

const xaList = [];
for (var item of locationData["xa"]) xaList.push(item);

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

function getHuyenFromXaId(xaId) {
  var huyenId;
  for (var item of xaList) {
    if (item[0] == xaId) {
      huyenId = item[3];
    }
  }
  var huyen;
  for (var item of quanList) {
    if (item[0] == huyenId) {
      huyen = item;
      break;
    }
  }
  return huyen;
}

function getTinhFromTinhId(tinhId) {
  for (var item of tinhList) {
    if (item[0] == tinhId)
      return item;
  }
  return null;
}

function dangkyTaiKhoan() {
  window.location.replace(Constant.register_client);
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
      roleData.set(["ROLE_AUTHORITY"]);
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
        console.log("result getWard: ", res.data.data.ward);
        wardData.set(res.data.data.ward);

        if (res.data.data.ward != null) {
          var district = getHuyenFromXaId(res.data.data.ward.id);
          console.log("district = ", district);
          districtData.set(district);

          var province = getTinhFromTinhId(district[3]);
          console.log("tinh = ", province);
          provinceData.set(province);
        } else {
          districtData.set(null);
          provinceData.set(null);
        }

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

      });
            
    } else {

      console.log("login failed because of usernamePass");
      alert("Username or Password wrong");
    }
  }

  return(
    <div class="mx-auto" style={{width: '500px', marginBottom: '150px'}}>
      <div class="container">
        <div class="row justify-content-md-center">
          <h1 class = "text-center">Cứu nạn Lũ lụt</h1>
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
              <button type="submit" class="btn btn-success" style={{width: '150px', fontWeight: "bold"}}>Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>

      <div style={{width: '300px'}} class = "text-center mx-auto">
        <button class="btn btn-secondary" style={{width: '200px', marginTop:'50px', fontWeight: "bold"}} onClick={() => dangkyTaiKhoan()}>Đăng ký tài khoản</button>
      </div>
    </div>
  )
}
