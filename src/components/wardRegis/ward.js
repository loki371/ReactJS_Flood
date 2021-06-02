import React from 'react';
import jQuery from 'jquery'

import UserData from '../app/UserData';

const { tokenData, usernameData, roleData, wardData, districtData, provinceData } = UserData();

const locationData = require('../../location.json');

const quanList = [];
for (var item of locationData["quan"]) quanList.push(item);

const tinhList = [];
for (var item of locationData["tinh"]) tinhList.push(item);

const xaList = [];
for (var item of locationData["xa"]) xaList.push(item);

class Ward extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ward: 'Xa Tan Chinh',
      district: 'Huyen Tan Binh',
      province: 'TP HoChiMinh',

      subXa: [],
      subHuyen: []
    }

    // if (wardData.data !== null) {
    //     this.state = {
    //         ward : wardData.data,
    //         district: districtData.data,
    //         province: provinceData.data
    //     };
    // }
  }

  changeProvince(e) {
    let {name, value} = e.target;
    var subHuyen = [];
    
    for (var item of quanList) {
      if (item[3] == value)
        subHuyen.push(item);
    }

    this.setState({
      province : value,
      district: "",
      ward: "",

      subHuyen: subHuyen,
      subXa: []
    });
  }

  changeDistrict(e) {
    let {name, value} = e.target;

    var subXa = [];
    for (var item of xaList) {
      if (item[3] == value)
        subXa.push(item);
    }

    this.setState({
      district: value, 
      subXa: subXa
    });
  }

  changeWard(e) {
    let {name, value} = e.target;
    this.setState({
      ward : value
    });
  }

  render() {
    var khuVucLamViec = <div class="col-8" style={{fontWeight:"bold"}}>Hiện tại bạn chưa được cấp quyền để làm việc tại một địa phương</div>;
    if (wardData.data !== null) 
      khuVucLamViec = <div class="col-8" style={{fontWeight:"bold"}}>
        {wardData.data} - {districtData.data} - {provinceData.data}
      </div>;

    var dangKyDiaPhuong = <div>Tinh - Huyen - Xa</div>

    return (
      <div style={{marginLeft: '20px', margin:"20px", marginTop: "5px"}}>
        <h5 style={{width: "100%", textAlign: "center", fontWeight: "bold"}}>Đăng ký địa phương</h5>
        
        <div style={{width: '100%', textAlign: "center", paddingTop: "10px" ,height: "50px", marginTop: "30px", borderStyle:"groove", borderRadius: "5px"}} class="row">
          <h6 style={{width: "20%"}} class="col-4">Địa phương làm việc:</h6> {khuVucLamViec}
        </div>

        <div style={{width: '100%', textAlign: "center", height: "70px", marginTop: "20px", borderStyle:"groove", borderRadius: "5px"}} class="row">
          <div class="row" style={{padding: "0px", margin: "0px"}}>
            <h6 style={{width: "20%", marginTop: "10px", paddingTop: "10px"}} class="col-4">Đăng ký địa phương:</h6>
            <select class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "center"}} defaultValue="Tỉnh" value={this.state.province} onChange={e => this.changeProvince(e)}>
              {tinhList.map(tinh => {return <option value={tinh[0]} style={{textAlign: "center"}}>
                {tinh[1]}
              </option>})}
            </select>
            <select class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "center"}} defaultValue="Huyện" value={this.state.district} onChange={e => this.changeDistrict(e)}>
              {this.state.subHuyen.map(huyen => {return <option value = {huyen[0]} style={{textAlign: "center"}}>
                {huyen[1]}
              </option>})}
            </select>
            <select class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "center"}} defaultValue="Xã" value={this.state.ward} onChange={e => this.changeWard(e)}>
              {this.state.subXa.map(xa => {return <option value = {xa[0]} style={{textAlign: "center"}}>
                {xa[1]}
              </option>})}
            </select>
            <button type="button" class="btn col col-sm-1 btn-success" style={{width:"100px", height: "50px", marginRight: "20px", marginLeft: "20px", marginTop: "8px"}}>Đăng ký</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Ward;