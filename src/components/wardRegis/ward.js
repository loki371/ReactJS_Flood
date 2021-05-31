import React from 'react';

import UserData from '../app/UserData';

const { tokenData, usernameData, roleData, wardData, districtData, provinceData } = UserData();

class Ward extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ward: 'Xa Tan Chinh',
      district: 'Huyen Tan Binh',
      province: 'TP HoChiMinh'
    }

    // if (wardData.data !== null) {
    //     this.state = {
    //         ward : wardData.data,
    //         district: districtData.data,
    //         province: provinceData.data
    //     };
    // }
  }

  render() {

    return (
      <div>Hello every one</div>
    );
  }
}

export default Ward;