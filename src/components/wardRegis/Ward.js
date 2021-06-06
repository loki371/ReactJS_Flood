import React from 'react';
import jQuery from 'jquery';
import Constant from "../../constant";
import Axios from "axios";

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
      ward: '', // user dang lam viec
      district: '', // user dang lam viec
      province: '', // cua user dang lam viec

      wardId: "", // cho dang ky
      trangthai: "",  // cho dang ky

      showRegisForm: 0,

      subXa: [],
      subHuyen: []
    }

    if (wardData.data !== null) {
        this.setState({
            ward : wardData.data.name,
            district: districtData.data,
            province: provinceData.data,
        });
    }
  }

  componentDidMount() {
    Axios.defaults.headers.common['Authorization'] = tokenData.data;

    var url = Constant.getMyRegis;
    url = url + (roleData.data[0] == "ROLE_AUTHORITY" ? "authority" : "volunteer");
    console.log("url = ", url)
    Axios.get(
      url
    ).then((res) => {
      console.log("result RegisData: ", res.data.data);
      
      if (res.data.data != null) {
        var xa = this.getXaFromXaId(res.data.data.locationId);
        var huyen = this.getHuyenFromHuyenId(xa[3]);
        var tinh = this.getTinhFromTinhId(huyen[3]);
        console.log("xa ", xa);
        console.log("huyen ", huyen);
        console.log("tinh ", tinh);

        this.setState({
          trangthai: res.data.data.estate,
          showRegisForm: 2,
          tempWard: xa[1],
          tempDistrict: huyen[1],
          tempProvince: tinh[1],
          wardId: xa[0]
        });
      } else {
        this.setState({
          showRegisForm: 1,
        });
      }
    });
  }

  getHuyenFromXaId(xaId) {
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

  getHuyenFromHuyenId(huyenId) {
    for (var item of quanList) {
      if (item[0] == huyenId)
        return item;
    }
    return null;
  }

  getXaFromXaId(xaId) {
    for (var item of xaList) {
      if (item[0] == xaId)
        return item;
    }
    return null;
  }

  getTinhFromTinhId(tinhId) {
    for (var item of tinhList) {
      if (item[0] == tinhId)
        return item;
    }
    return null;
  }

  changeProvince(e) {
    let {name, value} = e.target;
    var subHuyen = [];
    
    for (var item of quanList) {
      if (item[3] == value)
        subHuyen.push(item);
    }

    this.setState({
      tempProvince : this.getTinhFromTinhId(value)[1],

      wardId: "",

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
      tempDistrict: this.getHuyenFromHuyenId(value)[1], 
      subXa: subXa,
      wardId: ""
    });
  }

  changeWard(e) {
    let {name, value} = e.target;

    this.setState({
      tempWard : this.getXaFromXaId(value)[1],
      wardId: value
    });
  }

  sendRegisterLocation() {
    if (this.state.wardId === "") {
      alert("Bạn phải chọn đầy đủ thông tin địa phương");
      return;
    }

    var baseUrl = Constant.regis_cors_cors;
    baseUrl = baseUrl + this.state.wardId + "?eRole=" + roleData.data[0];
    console.log("url = " + baseUrl);

    Axios.defaults.headers.common['Authorization'] = tokenData.data;
    Axios.post(
      baseUrl
    ).then((res) => {
      console.log("result: ", res);
    });

    this.setState({
      showRegisForm: 2,
      trangthai: "STATE_UNAUTHENTICATED"
    });
  }

  sendDeleteRegister() {
    var baseUrl = Constant.regis_cors_cors;
    baseUrl = baseUrl + this.state.wardId + "?eRole=" + roleData.data[0];
    console.log("url = " + baseUrl);

    Axios.defaults.headers.common['Authorization'] = tokenData.data;
    Axios.delete(
      baseUrl
    ).then((res) => {
      console.log("result: ", res);
    });

    this.setState({
      showRegisForm: true
    })
  }

  render() {
    var khuVucLamViec = <div class="col-8" style={{fontWeight:"bold"}}>Hiện tại bạn chưa được cấp quyền để làm việc tại một địa phương</div>;
    if (wardData.data !== null) 
      khuVucLamViec = <div class="col-8" style={{fontWeight:"bold"}}>
        {wardData.data.name} - {districtData.data[1]} - {provinceData.data[1]}
      </div>;

    var dangKyDiaPhuong = <div>Tinh - Huyen - Xa</div>

    return (
      <div style={{marginLeft: '20px', margin:"20px", marginTop: "5px", height: "500px"}}>
        <h5 style={{width: "100%", textAlign: "center", fontWeight: "bold"}}>Đăng ký địa phương</h5>
        
        <div style={{width: '100%', textAlign: "center", paddingTop: "10px" ,height: "50px", marginTop: "30px", borderStyle:"groove", borderRadius: "5px"}} class="row">
          <h6 style={{width: "20%"}} class="col-4">Địa phương làm việc:</h6> {khuVucLamViec}
        </div>

        {this.state.showRegisForm == 0 ? <div/> : (this.state.showRegisForm == 1 ?

        <div style={{width: '100%', textAlign: "center", height: "70px", marginTop: "20px", borderStyle:"groove", borderRadius: "5px"}} class="row">
          <div class="row" style={{padding: "0px", margin: "0px"}}>
            <h6 style={{width: "20%", marginTop: "10px", paddingTop: "10px"}} class="col-4">Đăng ký địa phương:</h6>
            <select class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "center"}} defaultValue="Tỉnh" onChange={e => this.changeProvince(e)}>
              {tinhList.map(tinh => {return <option value={tinh[0]} style={{textAlign: "center"}}>
                {tinh[1]}
              </option>})}
            </select>
            <select class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "center"}} defaultValue="Huyện"  onChange={e => this.changeDistrict(e)}>
              {this.state.subHuyen.map(huyen => {return <option value = {huyen[0]} style={{textAlign: "center"}}>
                {huyen[1]}
              </option>})}
            </select>
            <select class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "center"}} defaultValue="Xã" onChange={e => this.changeWard(e)}>
              {this.state.subXa.map(xa => {return <option value = {xa[0]} style={{textAlign: "center"}}>
                {xa[1]}
              </option>})}
            </select>
            <button type="button" class="btn col col-sm-1 btn-success" style={{width:"100px", height: "50px", marginRight: "20px", marginLeft: "20px", marginTop: "8px"}} 
              onClick={() => this.sendRegisterLocation()}>Đăng ký</button>
          </div>
        </div>

        : 

        <div style={{width: '100%', textAlign: "center", height: "70px", marginTop: "20px", borderStyle:"groove", borderRadius: "5px"}} class="row">
          <div class="row" style={{padding: "0px", margin: "0px"}}>
            <h6 style={{width: "20%", marginTop: "10px", paddingTop: "10px"}} class="col-4">Bản đăng ký:</h6>
            <div class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "center"}}>{this.state.tempProvince}</div>
            <div class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "center"}}>{this.state.tempDistrict}</div>
            <div class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "center"}}>{this.state.tempWard}</div>
            <div class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "center"}}>{this.state.trangthai}</div>

            <button type="button" class="btn col col-sm-1 btn-danger" style={{width:"150px", height: "50px", marginRight: "20px", marginLeft: "20px", marginTop: "8px"}} 
              onClick={() => this.sendDeleteRegister()}>Xóa đăng ký</button>
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default Ward;