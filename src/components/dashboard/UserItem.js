import React from 'react';
import Constant from "../../constant";
import Axios from "axios";
import UserData from "../app/UserData";
import RoleType from "../app/RoleType";
import SimpleMap from "./SimpleMap"

import NoAvatar from "../../no_picture.png";


const userData = UserData();
var tokenData = userData.tokenData;
var roleType = RoleType;

class UserItem extends React.Component {
    constructor(props) {
        super(props);

        this.userRole = props.userRole;
        this.itemRole = props.itemRole;

        if (this.userRole === roleType.AUTHORITY && this.itemRole === roleType.USER)
            this.state = {
                id : props.element.id,
                name : props.element.name,
                phone : props.element.phone,
                numPerson : props.element.numPerson,
                eState : props.element.eState,
                longitude : props.element.longitude,
                latitude : props.element.latitude,
                order : props.element.order,

                dashboard : props.dashboard,
                element : props.element,

                showChiTiet: false,
                source: null,
                avatar: 0 // chua show
            };
        else if (this.userRole === roleType.VOLUNTEER && this.itemRole === roleType.USER)
            this.state = {
                id : props.element.id,
                name : props.element.name,
                phone : props.element.phone,
                numPerson : props.element.numPerson,
                eState : props.element.eState,
                longitude : props.element.longitude,
                latitude : props.element.latitude,
                order : props.element.order,

                dashboard : props.dashboard,
                element : props.element,

                showChiTiet: false,
                source: null,
                avatar: 0 // chua show
            };
        else
            this.state = {
                id : props.element.id,
                name : props.element.username,
                eState : props.element.eState,
                phone: props.element.phone,
                email: props.element.email,

                dashboard : props.dashboard,
                element : props.element,

                showChiTiet: false,
                source: null,
                avatar: 0   // chua show
            };
        this.state.textBtxChiTiet = "Chi tiết";
        this.state.soNguoiTemp = this.state.numPerson;
        this.state.orderTemp = this.state.order;
    }

    xemChitiet() {
        this.setState({
            orderTemp: this.state.order,
            soNguoiTemp: this.state.numPerson
        });

        if (this.state.showChiTiet == true) {
            this.setState({
                showChiTiet: false,
                textBtxChiTiet: "Chi tiết"
            });
            return;    
        }
        this.setState({avatar: 0});

        var url = Constant.image_service + "/list/" + this.state.id;
        Axios.get(url, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': tokenData.data
            },
        }).then((res) => {
            console.log("result = ", res.data[0]['regidId-url']);
            
            this.setState({
                showChiTiet: !this.state.showChiTiet,
                source: Constant.python_service + "/" + res.data[0]['regidId-url'],
                textBtxChiTiet: "Ẩn",
                avatar: 2
            });
        }).catch(() => {
            
            this.setState({
                showChiTiet: !this.state.showChiTiet,
                textBtxChiTiet: "Ẩn",
                avatar: 1
            });
        });
    }

    guiAcceptRejectToUserRegis(newState1, accept, url) {
        console.log("send acceptReject  id " + this.state.id + " oldState " + this.state.eState + " newState " + newState1);
        //console.log("token ", tokenData.data);
        Axios.defaults.headers.common['Authorization'] = tokenData.data;
        Axios.put(
                url
                + "/" + this.state.id 
                + "?oldState=" + this.state.eState
                + "&newState=" + newState1
        ).then((res) => {
    
            console.log("response = ", res.data);
            var dashboard = this.state.dashboard;

            var arrAccept = dashboard.state.dataAccept;
            var arrRequest = dashboard.state.dataRequest;

            console.log("guiAcceptRejectToUserRegis : arrAc ", arrAccept);
            console.log("guiAcceptRejectToUserRegis : arrRe ", arrRequest);

            var index;
            if (accept) {
                index = indexOf(arrRequest, this.state.id);
                console.log("index accept ", index);
                if (index !== -1) {
                    arrRequest.splice(index, 1);
                    this.state.element.eState = "STATE_AUTHENTICATED";

                    if (res.data.data !== true)
                        arrAccept.push(this.state.element);
                        
                    console.log("thay doi state Accept");
                }
            } else {
                index = indexOf(arrAccept, this.state.id);
                console.log("index delete ", index);
                if (index !== -1) {
                    arrAccept.splice(index, 1);
                    this.state.element.eState = "STATE_UNAUTHENTICATED";
                    arrRequest.push(this.state.element);
                    console.log("thay doi state Delete");
                }
            }

            dashboard.setState(
                {dataAccept : arrAccept,
                    dataRequest: arrRequest}
            );


        
        }).catch(function(error) {
            console.log("error = ", error);
        
            return false;
        });
    }

    guiAcceptRejectToUserRegisVolunteer(newState1, accept, url) {
        //console.log("send acceptReject  id " + this.state.id + " oldState " + this.state.eState + " newState " + newState1);
        //console.log("token ", tokenData.data);
        Axios.defaults.headers.common['Authorization'] = tokenData.data;
        Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        Axios.put(
                url
                + "/" + this.state.id 
                + "?oldState=" + this.state.eState
                + "&newState=" + newState1
        ).then((res) => {
    
            console.log("response = ", res.data);
            var dashboard = this.state.dashboard;

            var arrAccept = dashboard.state.dataAccept;
            var arrRequest = dashboard.state.dataRequest;

            console.log("guiAcceptRejectToUserRegis : arrAc ", arrAccept);
            console.log("guiAcceptRejectToUserRegis : arrRe ", arrRequest);

            var index;
            if (accept) {
                index = indexOf(arrRequest, this.state.id);
                console.log("index accept ", index);
                if (index !== -1) {
                    arrRequest.splice(index, 1);
                    if (newState1 === "STATE_EMERGENCY") {
                        this.state.element.eState = "STATE_EMERGENCY";
                        arrAccept.push(this.state.element);
                    }
                    console.log("thay doi state STATE_EMERGENCY");
                }
            } else {
                index = indexOf(arrAccept, this.state.id);
                if (index !== -1) {

                    console.log("index reject ", index);
                    arrAccept.splice(index, 1)
                    if (newState1 === "STATE_DANGER") {
                        this.state.element.eState = "STATE_DANGER";
                        arrRequest.push(this.state.element);
                    }
                    console.log("thay doi state STATE_DANGER");

                } else {
                    index = indexOf(arrRequest, this.state.id);
                    console.log("index delete ", index);
                    if (index !== -1) {
                        arrRequest.splice(index, 1)
                    }
                }
            }

            dashboard.setState(
                {dataAccept : arrAccept,
                    dataRequest: arrRequest}
            );


        
        }).catch(function(error) {
            console.log("error = ", error);
        
            return false;
        });
    }

    guiAcceptRejectToAuthRegis(accept, url) {
        //console.log("send acceptReject  id " + this.state.id + " oldState " + this.state.eState + " newState " + newState1);
        //console.log("token ", tokenData.data);
        Axios.defaults.headers.common['Authorization'] = tokenData.data;
        console.log("accept = ", accept);
        var stringAccept = (accept===true) ? "true" : "false";
        console.log("string accept ", stringAccept);
        Axios.post(
            url + "/" + this.state.name + "?accept=" + stringAccept
        ).then((res) => {
    
            console.log("response = ", res.data);
            var dashboard = this.state.dashboard;

            var arrAccept = dashboard.state.dataAccept;
            var arrRequest = dashboard.state.dataRequest;

            console.log("guiAcceptRejectToUserRegis : arrAc ", arrAccept);
            console.log("guiAcceptRejectToUserRegis : arrRe ", arrRequest);

            var index;
            if (accept) {
                index = indexOfUsername(arrRequest, this.state.name);
                console.log("index accept ", index);
                if (index !== -1) {
                    arrRequest.splice(index, 1);
                    this.state.element.eState = "STATE_AUTHENTICATED";
                    arrAccept.push(this.state.element);
                    console.log("thay doi state Accept");
                }
            } else {
                index = indexOfUsername(arrAccept, this.state.name);
                console.log("index reject ", index);
                if (index !== -1) {
                    arrAccept.splice(index, 1);
                } else {
                    index = indexOfUsername(arrRequest, this.state.name);
                    console.log("index delete ", index);
                    if (index !== -1) {
                        arrRequest.splice(index, 1)
                    }
                }
            }

            dashboard.setState(
                {dataAccept : arrAccept,
                    dataRequest: arrRequest}
            );


        
        }).catch(function(error) {
            console.log("error = ", error);
        
            return false;
        });
    }

    guiCapNhanRegistration() {
        this.setState({
            numPerson : this.state.soNguoiTemp,
            order : this.state.orderTemp
        })
        console.log("Gui nek: numPerson " + this.state.soNguoiTemp + " order " + this.state.orderTemp);
        Axios.defaults.headers.common['Authorization'] = tokenData.data;
        Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        Axios.put(
                Constant.update_regis
                + "/" + this.state.id 
                + "?numPeople=" + this.state.soNguoiTemp
                + "&order=" + this.state.orderTemp
        );
        alert("Cập nhật dữ liệu thành công");
    }

    changeTinhTrangKhanCap(e) {
        this.setState({orderTemp : e.target.value});
        console.log("orderTemp " + this.state.orderTemp);
    }

    handleChangeNumPerson(event) {
        this.setState({soNguoiTemp :  event.target.value});
        console.log("soNguoiTemp " + this.state.soNguoiTemp);
    }

    render() {
        var thongTinChiTiet = null, chinhSuaThongTin = null;
        thongTinChiTiet = 
        <div class="row">
            <div class = "col col-md-5" style={{paddingTop: "3px", alignItems: "center"}}>
                <p class = "row" style = {{paddingLeft: '58px', paddingBottom: "2px", margin: '0px', fontWeight: "bold"}}>Chân dung</p>
                {
                    this.state.avatar == 1 ? 
                        <img class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px', objectFit: "cover", borderRadius: "10px"}} width="200" height="300" src = {NoAvatar}></img> 
                        :  ( this.state.avatar == 0 ? 
                            <div/>
                            : <img class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px', objectFit: "cover", borderRadius: "10px"}} width="200" height="300" src = {this.state.source}></img> )
                }
            </div>

            <div class = "col col-md-5" style={{paddingTop: "3px", paddingLeft: "10px", alignItems: "right"}}>               
                <p class = "row" style = {{paddingLeft: '110px', paddingBottom: "2px", margin: '0px', fontWeight: "bold"}}>Vị trí</p>
                <SimpleMap longitude={this.state.longitude} latitude={this.state.latitude} class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px', borderRadius: "10px"}} height="250"/>
            </div>
                        
        </div>;
        
        if (this.userRole == roleType.VOLUNTEER)
            chinhSuaThongTin = 
            <div class="row" style = {{paddingTop: "3px", paddingBottom: "10px"}}>
                <div class = "col" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                    <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px", paddingLeft: "10px"}}>Chỉnh sửa thông tin</h6>
                    <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Số người: 
                        <input type="number" style={{width: "100px", marginLeft: "30px"}} 
                        value={this.state.soNguoiTemp} 
                        onChange={event => this.handleChangeNumPerson(event)}></input>
                    </p>
                    <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px', paddingTop: "5px"}}>Tình trạng: 
                        <select class="col list-group" 
                            style={{height: "30px", marginLeft: "20px", textAlign: "left", width: "150px"}} 
                            value = {this.state.orderTemp}
                            onChange={e => this.changeTinhTrangKhanCap(e)}>
                            <option value="0">Cực kỳ khẩn cấp: Cấp cứu người bệnh, phụ nữ sắp sinh</option>
                            <option value="1">Rất khẩn cấp: Vị trí nhiều trẻ nhỏ</option>
                            <option value="2">Khẩn cấp: Vị trí nhiều người già, phụ nữ</option>
                            <option value="3">Không khẩn cấp</option>
                        </select>                    
                    </p>
                </div>
                <div class = "col col-md-auto"></div>
                <div class = "col col-md-3" style={{alignItems: "right"}}>
                    <div class = "row">
                        <button class = "btn btn-info btn-sm" type="button" style={{marginBottom: "5px", marginTop: "15px", fontSize: "13px", width:"80px"}}onClick={()=>this.guiCapNhanRegistration()}>Cập nhật</button>
                    </div>
                </div>
            </div>;

        console.log("UserItem : ", this.state.name, " state ", this.state.eState);
        if (this.userRole === roleType.AUTHORITY && this.itemRole === roleType.USER) {
            if (this.state.eState === "STATE_UNAUTHENTICATED")
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "auto"}}>
                        <div class="row">
                            <div class = "col" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px", paddingLeft: "10px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Số người: { this.state.numPerson }</p>
                            </div>
                            <div class = "col col-md-auto"></div>
                            <div class = "col col-md-2" style={{alignItems: "right"}}>
                                <div class = "row">
                                    <button class = "btn btn-success btn-sm" type="button" style={{marginBottom: "5px", marginTop: "5px", fontSize: "13px", width:"65px"}}onClick={()=>this.guiAcceptRejectToUserRegis("STATE_AUTHENTICATED", true, Constant.accept_reject_user_regis)}>Thêm</button>
                                </div>
                                <div class = "row">
                                    <button class = "btn btn-primary btn-sm" type="button" style={{fontSize: "11px", width:"65px"}} onClick={()=>this.xemChitiet()}>{this.state.textBtxChiTiet}</button>
                                </div>
                            </div>
                        </div>
                        {this.state.showChiTiet ? thongTinChiTiet : null}
                    </div>
                )
            else 
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "auto"}}>
                        <div class="row">
                            <div class = "col" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px", paddingLeft: "10px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Số người: { this.state.numPerson }</p>
                            </div>
                            <div class = "col col-md-auto"></div>
                            <div class = "col col-md-2" style={{alignItems: "right"}}>
                                <div class = "row">
                                    <button class = "btn btn-danger btn-sm" type="button" style={{marginBottom: "5px", marginTop: "5px", fontSize: "13px", width:"65px"}}onClick={()=>this.guiAcceptRejectToUserRegis("STATE_UNAUTHENTICATED", false, Constant.accept_reject_user_regis )}>Xóa</button>
                                </div>
                                <div class = "row">
                                    <button class = "btn btn-primary btn-sm" type="button" style={{fontSize: "11px", width:"65px"}} onClick={()=>this.xemChitiet()}>{this.state.textBtxChiTiet}</button>
                                </div>
                            </div>
                        </div>
                        {this.state.showChiTiet ? thongTinChiTiet : null}
                    </div>
                );

        } else if (this.userRole === roleType.AUTHORITY && this.itemRole === roleType.AUTHORITY) {
            if (this.state.eState === "STATE_UNAUTHENTICATED" || this.state.eState === null)
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "110px"}}>
                        <div class="row">
                            <div class = "col" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px", paddingLeft: "10px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Email: { this.state.email }</p>
                            </div>
                            <div class = "col col-md-auto"></div>
                            <div class = "col col-md-3" style={{alignItems: "right"}}>
                                <div class = "row">
                                    <button class = "btn btn-success btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(true, Constant.auth_location_regis)}>Thêm</button>
                                </div>
                                <div class = "row">
                                    <button class = "btn btn-warning btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.auth_location_regis)}>Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            else 
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "110px"}}>
                        <div class="row">
                            <div class = "col" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px", paddingLeft: "10px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Email: { this.state.email }</p>
                            </div>
                            <div class = "col col-md-auto"></div>
                            <div class = "col col-md-2" style={{alignItems: "right"}}>
                                <button class = "row btn btn-danger btn-sm" type="button" style={{marginBottom: "5px", marginTop: "5px", fontSize: "13px", width:"65px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.auth_location_regis)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                );
        } else if (this.userRole === roleType.AUTHORITY && this.itemRole === roleType.RESCUER) {
            if (this.state.eState === "STATE_UNAUTHENTICATED" || this.state.eState === null)
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "110px"}}>
                        <div class="row">
                            <div class = "col" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px", paddingLeft: "10px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Email: { this.state.email }</p>
                            </div>

                            <div class = "col col-md-auto"></div>

                            <div class = "col col-md-3" style={{alignItems: "right"}}>
                                <div class = "row">
                                    <button class = "btn btn-success btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(true, Constant.resc_location_regis)}>Thêm</button>
                                </div>
                                <div class = "row">
                                    <button class = "btn btn-warning btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.resc_location_regis)}>Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            else 
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "110px"}}>
                        <div class="row">   
                             <div class = "col" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px", paddingLeft: "10px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Email: { this.state.email }</p>
                            </div>

                            <div class = "col col-md-auto"></div>

                            <div class = "col col-md-2" style={{alignItems: "right"}}>
                                <button class = "row btn btn-danger btn-sm" type="button" style={{marginBottom: "5px", marginTop: "5px", fontSize: "13px", width:"65px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.resc_location_regis)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                );
        } else if (this.userRole === roleType.AUTHORITY && this.itemRole === roleType.VOLUNTEER) {
            if (this.state.eState === "STATE_UNAUTHENTICATED" || this.state.eState === null)
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "110px"}}>
                        <div class="row">   
                            <div class = "col" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px", paddingLeft: "10px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Email: { this.state.email }</p>
                            </div>
                            <div class = "col col-md-auto"></div>
                            <div class = "col col-md-3" style={{alignItems: "right"}}>
                                <div class = "row">
                                    <button class = "btn btn-success btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(true, Constant.volu_location_regis)}>Thêm</button>
                                </div>
                                <div class = "row">
                                    <button class = "btn btn-warning btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.volu_location_regis)}>Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            else 
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "110px"}}>
                        <div class="row">   
                            <div class = "col" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px", paddingLeft: "10px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Email: { this.state.email }</p>
                            </div>

                            <div class = "col col-md-auto"></div>

                            <div class = "col col-md-2" style={{alignItems: "right"}}>
                                <button class = "row btn btn-danger btn-sm" type="button" style={{marginBottom: "5px", marginTop: "5px", fontSize: "13px", width:"65px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.volu_location_regis)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                );
        } else if (this.userRole === roleType.VOLUNTEER && this.itemRole === roleType.USER) {
            if (this.state.eState === "STATE_DANGER" || this.state.setState === null)
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "auto"}}>
                        <div class="row">   
                            <div class = "col" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px", height: "110px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px", paddingLeft: "10px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Số người: { this.state.numPerson }</p>
                            </div>

                            <div class = "col col-md-auto"></div>

                            <div class = "col col-md-3" style={{alignItems: "right"}}>
                                <div class = "row">
                                    <button class = "row btn btn-danger btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToUserRegisVolunteer("STATE_EMERGENCY", true, Constant.emergency_location_regis)}>Nguy hiểm</button>
                                </div>
                                <div class = "row">
                                    <button class = "row btn btn-success btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToUserRegisVolunteer("STATE_SAFE", false, Constant.emergency_location_regis)}>An toàn</button>
                                </div>
                                <div class = "row">
                                    <button class = "row btn btn-primary btn-sm" type="button" style={{fontSize: "11px", width:"65px", marginTop: '2px'}} onClick={()=>this.xemChitiet()}>{this.state.textBtxChiTiet}</button>
                                </div>
                            </div>
                        </div>
                        {this.state.showChiTiet ? thongTinChiTiet : null}
                        {this.state.showChiTiet ? chinhSuaThongTin : null}
                    </div>);
            else
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "auto"}}>
                        <div class="row">   
                            <div class = "col" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px", height: "110px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px", paddingLeft: "10px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Số người: { this.state.numPerson }</p>
                            </div>

                            <div class = "col col-md-auto"></div>

                            <div class = "col col-md-2" style={{alignItems: "right"}}>
                                <div class = "row">
                                    <button class = "row btn btn-success btn-sm" type="button" style={{marginTop: "5px", fontSize: "13px", width:"65px"}}onClick={()=>this.guiAcceptRejectToUserRegisVolunteer("STATE_SAFE", false, Constant.emergency_location_regis)}>An toàn</button>
                                </div>
                                <div class = "row">
                                    <button class = "row btn btn-primary btn-sm" type="button" style={{fontSize: "11px", width:"65px"}} onClick={()=>this.xemChitiet()}>{this.state.textBtxChiTiet}</button>
                                </div>
                            </div>
                        </div>
                        {this.state.showChiTiet ? thongTinChiTiet : null}
                        {this.state.showChiTiet ? chinhSuaThongTin : null}
                    </div>);
        }
    }
}

export default UserItem;

function indexOf(arr, id) {
    var i = 0;
    var j = -1;
    arr.forEach(item => {
        console.log("indexOf, itemId ", item.id, " idCompare ", id);
        if (item.id === id) {
            j = i;
            console.log("=== : item.id ", item.id, " id ", id)
        }
        ++i;
    });
    return j;
}

function indexOfUsername(arr, name) {
    var i = 0;
    var j = -1;
    arr.forEach(item => {
        console.log("indexOf, itemId ", item.id, " nameCompare ", name);
        if (item.username === name) {
            j = i;
        }
        ++i;
    });
    return j;
}
