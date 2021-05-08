import React from 'react';
import Logout from "../logout/Logout"

export default function Dashboard() {
  return(
    <div>
      <h2>Dashboard: </h2>
      <button type="button" onClick={Logout}>Logout!</button>
    </div>
  );
}