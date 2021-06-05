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

class FloodState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      showLuForm: 0,

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

    var url = Constant.floodNotification;
    console.log("url = ", url);
    Axios.get(
      url
    ).then((res) => {
      console.log("result RegisData: ", res.data.data);

      var coLu = false;
      for (var item of res.data.data) {
          if (item == wardData.data.id) {
            coLu = true;
          }
      }
      
      if (coLu) {
        this.setState({
          showLuForm: 2,
        });
      } else {
        this.setState({
          showLuForm: 1,
        });
      }
    });
  }

  sendBaoDongLu() {
    if (this.state.wardId === "") {
      alert("Bạn phải chọn đầy đủ thông tin địa phương");
      return;
    }

    var baseUrl = Constant.floodNotification + "/"+ wardData.data.id;
    console.log("url = " + baseUrl);

    Axios.defaults.headers.common['Authorization'] = tokenData.data;
    Axios.post(
      baseUrl
    ).then((res) => {
      console.log("result: ", res);
    });

    this.setState({
      showLuForm: 2,
    });
  }

  sendKetThucLu() {
    var baseUrl = Constant.floodNotification + "/"+ wardData.data.id;
    console.log("url = " + baseUrl);

    Axios.defaults.headers.common['Authorization'] = tokenData.data;
    Axios.delete(
      baseUrl
    ).then((res) => {
      console.log("result: ", res);
    });

    this.setState({
      showLuForm: 1
    })
  }

  render() {
    var khuVucLamViec = <div class="col-8" style={{fontWeight:"bold", textAlign: "center"}}>Hiện tại bạn chưa được cấp quyền để làm việc tại một địa phương</div>;
    if (wardData.data !== null) 
      khuVucLamViec = <div class="col-8" style={{fontWeight:"bold", textAlign: "center"}}>
        {wardData.data.name} - {districtData.data[1]} - {provinceData.data[1]}
      </div>;

    return (
      <div style={{marginLeft: '20px', margin:"20px", marginTop: "5px", height: "500px"}}>
        <h5 style={{width: "100%", textAlign: "center", fontWeight: "bold"}}>Tình trạng lũ lụt</h5>
        
        <div style={{width: '100%', textAlign: "left", paddingTop: "10px" ,height: "50px", marginTop: "30px", paddingLeft: "30px", borderStyle:"groove", borderRadius: "5px"}} class="row">
          <h6 style={{width: "20%"}} class="col-4">Địa phương:</h6> {khuVucLamViec}
        </div>

        {this.state.showLuForm == 0 ? <div/> : (this.state.showLuForm == 1 ?

        <div style={{width: '100%', textAlign: "left", height: "70px", marginTop: "20px", borderStyle:"groove", borderRadius: "5px"}} class="row">
            <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px"}}>
                <h6 class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Tình trạng hiện tại:</h6>
                <div class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left", fontWeight:"bold", paddingLeft: "20px"}}>Không có lũ</div>
                <button type="button" class="btn col col-sm-1 btn-danger" style={{width:"300px", height: "50px", marginRight: "20px", marginLeft: "20px", marginTop: "8px"}} 
                    onClick={() => this.sendBaoDongLu()}>Báo động có lũ</button>
            </div>
        </div>

        : 

        <div style={{width: '100%', textAlign: "center", height: "70px", marginTop: "20px", borderStyle:"groove", borderRadius: "5px"}} class="row">
          <div class="row" style={{padding: "0px", margin: "0px", paddingLeft: "20px"}}>
            <h6 class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left"}}>Tình trạng hiện tại:</h6>
            <div class="col list-group" style={{marginTop: "17px", height: "30px", marginLeft: "20px", textAlign: "left", fontWeight:"bold", paddingLeft: "20px"}}>Đang xảy ra lũ</div>
            <button type="button" class="btn col col-sm-1 btn-success" style={{width:"300px", height: "50px", marginRight: "20px", marginLeft: "20px", marginTop: "8px"}} 
              onClick={() => this.sendKetThucLu()}>Kết thúc báo động lũ</button>
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default FloodState;