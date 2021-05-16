import React from 'react';
import Logout from "../logout/Logout"

class Dashboard extends React.Component {
  render() {
    return(
      <div>
        <h2>Dashboard: </h2>
        <button type="button" onClick={Logout}>Logout!</button>
      </div>
    );
  }
}

export default Dashboard;