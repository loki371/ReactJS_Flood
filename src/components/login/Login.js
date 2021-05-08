import React, { useState } from 'react';

import './Login.css';
import UserData from "../app/UserData";

async function loginUser(credentials) {
  return fetch('http://localhost:8080/v1/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login() {
  const { tokenData, usernameData, roleData } = UserData();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

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
    }
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}