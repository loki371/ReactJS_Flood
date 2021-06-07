import React from 'react';
import Constant from "../../constant";
import Axios from "axios";
import UserData from "../app/UserData";
import RoleType from "../app/RoleType";

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
                estate : props.element.estate,
                longitude : props.element.longitude,
                latitude : props.element.latitude,

                dashboard : props.dashboard,
                element : props.element
            };
        else if (this.userRole === roleType.VOLUNTEER && this.itemRole === roleType.USER)
            this.state = {
                id : props.element.id,
                name : props.element.name,
                phone : props.element.phone,
                numPerson : props.element.numPerson,
                estate : props.element.estate,
                longitude : props.element.longitude,
                latitude : props.element.latitude,

                dashboard : props.dashboard,
                element : props.element
            };
        else
            this.state = {
                id : props.element.id,
                name : props.element.username,
                estate : props.element.estate,
                phone: props.element.phone,
                email: props.element.email,

                dashboard : props.dashboard,
                element : props.element
            };

        this.state.showChiTiet = false;
        this.state.source = null;
    }

    xemChitiet() {
        console.log("log xem chi tiet");
        this.setState({
            showChiTiet: !this.state.showChiTiet
        });
    }

    guiAcceptRejectToUserRegis(newState1, accept, url) {
        //console.log("send acceptReject  id " + this.state.id + " oldState " + this.state.estate + " newState " + newState1);
        //console.log("token ", tokenData.data);
        Axios.defaults.headers.common['Authorization'] = tokenData.data;
        Axios.put(
                url
                + "/" + this.state.id 
                + "?oldState=" + this.state.estate
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
                    this.state.element.estate = "STATE_AUTHENTICATED";
                    arrAccept.push(this.state.element);
                    console.log("thay doi state Accept");
                }
            } else {
                index = indexOf(arrAccept, this.state.id);
                console.log("index delete ", index);
                if (index !== -1) {
                    arrAccept.splice(index, 1);
                    this.state.element.estate = "STATE_UNAUTHENTICATED";
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
        //console.log("send acceptReject  id " + this.state.id + " oldState " + this.state.estate + " newState " + newState1);
        //console.log("token ", tokenData.data);
        Axios.defaults.headers.common['Authorization'] = tokenData.data;
        Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        Axios.put(
                url
                + "/" + this.state.id 
                + "?oldState=" + this.state.estate
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
                        this.state.element.estate = "STATE_EMERGENCY";
                        arrAccept.push(this.state.element);
                    }
                    console.log("thay doi state STATE_EMERGENCY");
                }
            } else {
                index = indexOf(arrAccept, this.state.id);
                console.log("index delete ", index);
                if (index !== -1) {
                    arrAccept.splice(index, 1)
                    if (newState1 === "STATE_DANGER") {
                        this.state.element.estate = "STATE_DANGER";
                        arrRequest.push(this.state.element);
                    }
                    console.log("thay doi state STATE_DANGER");
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
        //console.log("send acceptReject  id " + this.state.id + " oldState " + this.state.estate + " newState " + newState1);
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
                    this.state.element.estate = "STATE_AUTHENTICATED";
                    arrAccept.push(this.state.element);
                    console.log("thay doi state Accept");
                }
            } else {
                index = indexOfUsername(arrAccept, this.state.name);
                console.log("index reject ", index);
                if (index !== -1) {
                    arrAccept.splice(index, 1);
                    //this.state.element.state = "STATE_UNAUTHENTICATED";
                    //arrRequest.push(this.state.element);
                    //console.log("thay doi state Delete");
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

    render() {
        var thongTinChiTiet;
        thongTinChiTiet = 
        <div class="row">
            <div class = "col col-md-5" style={{paddingTop: "3px", alignItems: "center"}}>
                <p class = "row" style = {{paddingLeft: '58px', paddingBottom: "2px", margin: '0px', fontWeight: "bold"}}>Chân dung</p>
                <img class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px', objectFit: "cover", borderRadius: "10px"}} width="200" height="300" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"></img>
            </div>

            <div class = "col col-md-5" style={{paddingTop: "3px", paddingLeft: "10px", alignItems: "right"}}>               
                <p class = "row" style = {{paddingLeft: '110px', paddingBottom: "2px", margin: '0px', fontWeight: "bold"}}>Vị trí</p>
                <img class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px', objectFit: "cover", borderRadius: "10px"}} width="260" height="300" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"></img>
            </div>
                        
        </div>;

        console.log("UserItem : ", this.state.name, " state ", this.state.estate);
        if (this.userRole === roleType.AUTHORITY && this.itemRole === roleType.USER) {
            if (this.state.estate === "STATE_UNAUTHENTICATED")
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "auto"}}>
                        <div class="row">
                            <div class = "col col-md-10" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Số người: { this.state.numPerson }</p>
                            </div>
                            
                            <div class = "col col-md-2" style={{alignItems: "right"}}>
                                <button class = "row btn btn-success btn-sm" type="button" style={{marginBottom: "5px", marginTop: "5px", fontSize: "13px", width:"65px"}}onClick={()=>this.guiAcceptRejectToUserRegis("STATE_AUTHENTICATED", true, Constant.accept_reject_user_regis)}>Thêm</button>
                                <button class = "row btn btn-primary btn-sm" type="button" style={{fontSize: "11px", width:"65px"}} onClick={()=>this.xemChitiet()}>Chi tiết</button>
                            </div>
                        </div>
                        {this.state.showChiTiet ? thongTinChiTiet : null}
                    </div>
                )
            else 
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "auto"}}>
                        <div class="row">
                            <div class = "col col-md-10" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Số người: { this.state.numPerson }</p>
                            </div>

                            <div class = "col col-md-2" style={{alignItems: "right"}}>
                                <button class = "row btn btn-danger btn-sm" type="button" style={{marginBottom: "5px", marginTop: "5px", fontSize: "13px", width:"65px"}}onClick={()=>this.guiAcceptRejectToUserRegis("STATE_UNAUTHENTICATED", false, Constant.accept_reject_user_regis )}>Xóa</button>
                                <button class = "row btn btn-primary btn-sm" type="button" style={{fontSize: "11px", width:"65px"}} onClick={()=>this.xemChitiet()}>Chi tiết</button>
                            </div>
                        </div>
                        {this.state.showChiTiet ? thongTinChiTiet : null}
                    </div>
                );

        } else if (this.userRole === roleType.AUTHORITY && this.itemRole === roleType.AUTHORITY) {
            if (this.state.estate === "STATE_UNAUTHENTICATED" || this.state.estate === null)
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "110px"}}>
                        <div class="row">
                            <div class = "col col-md-9" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Email: { this.state.email }</p>
                            </div>

                            <div class = "col col-md-3" style={{alignItems: "right"}}>
                                <button class = "row btn btn-success btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(true, Constant.auth_location_regis)}>Thêm</button>
                                <button class = "row btn btn-warning btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.auth_location_regis)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                )
            else 
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "110px"}}>
                        <div class="row">
                            <div class = "col col-md-10" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Email: { this.state.email }</p>
                            </div>

                            <div class = "col col-md-2" style={{alignItems: "right"}}>
                                <button class = "row btn btn-danger btn-sm" type="button" style={{marginBottom: "5px", marginTop: "5px", fontSize: "13px", width:"65px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.auth_location_regis)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                );
        } else if (this.userRole === roleType.AUTHORITY && this.itemRole === roleType.RESCUER) {
            if (this.state.estate === "STATE_UNAUTHENTICATED" || this.state.estate === null)
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "110px"}}>
                        <div class="row">
                            <div class = "col col-md-9" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Email: { this.state.email }</p>
                            </div>

                            <div class = "col col-md-3" style={{alignItems: "right"}}>
                                <button class = "row btn btn-success btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(true, Constant.resc_location_regis)}>Thêm</button>
                                <button class = "row btn btn-warning btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.resc_location_regis)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                )
            else 
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "110px"}}>
                        <div class="row">   
                             <div class = "col col-md-10" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Email: { this.state.email }</p>

                            </div>

                            <div class = "col col-md-2" style={{alignItems: "right"}}>
                                <button class = "row btn btn-danger btn-sm" type="button" style={{marginBottom: "5px", marginTop: "5px", fontSize: "13px", width:"65px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.resc_location_regis)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                );
        } else if (this.userRole === roleType.AUTHORITY && this.itemRole === roleType.VOLUNTEER) {
            if (this.state.estate === "STATE_UNAUTHENTICATED" || this.state.estate === null)
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "110px"}}>
                        <div class="row">   
                            <div class = "col col-md-9" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Email: { this.state.email }</p>
                            </div>

                            <div class = "col col-md-3" style={{alignItems: "right"}}>
                                <button class = "row btn btn-success btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(true, Constant.volu_location_regis)}>Thêm</button>
                                <button class = "row btn btn-warning btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.volu_location_regis)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                )
            else 
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "110px"}}>
                        <div class="row">   
                            <div class = "col col-md-10" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Email: { this.state.email }</p>
                            </div>

                            <div class = "col col-md-2" style={{alignItems: "right"}}>
                                <button class = "row btn btn-danger btn-sm" type="button" style={{marginBottom: "5px", marginTop: "5px", fontSize: "13px", width:"65px"}}onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.volu_location_regis)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                );
        } else if (this.userRole === roleType.VOLUNTEER && this.itemRole === roleType.USER) {
            if (this.state.estate === "STATE_DANGER" || this.state.setState === null)
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "auto"}}>
                        <div class="row">   
                            <div class = "col col-md-9" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px", height: "110px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Số người: { this.state.numPerson }</p>
                            </div>

                            <div class = "col col-md-3" style={{alignItems: "right"}}>
                                <button class = "row btn btn-danger btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToUserRegisVolunteer("STATE_EMERGENCY", true, Constant.emergency_location_regis)}>Nguy hiểm</button>
                                <button class = "row btn btn-success btn-sm" type="button" style={{marginTop: "2px", fontSize: "13px", width:"90px"}}onClick={()=>this.guiAcceptRejectToUserRegisVolunteer("STATE_SAFE", false, Constant.emergency_location_regis)}>An toàn</button>
                                <button class = "row btn btn-primary btn-sm" type="button" style={{fontSize: "11px", width:"65px", marginTop: '2px'}} onClick={()=>this.xemChitiet()}>Chi tiết</button>
                            </div>
                        </div>
                        {this.state.showChiTiet ? thongTinChiTiet : null}
                    </div>);
            else
                return (
                    <div class = "col" style={{backgroundColor:"white", margin:"5px", borderStyle: 'groove',  borderRadius: '10px', padding: "10px", height: "auto"}}>
                        <div class="row">   
                            <div class = "col col-md-10" style={{backgroundColor:"white", height: "90px", paddingTop: "3px", paddingLeft: "20px", height: "110px"}}>
                                <h6 class = "row" style={{fontWeight:"bold", fontSize: "18px"}}>Tên: { this.state.name }</h6>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>SĐT: { this.state.phone }</p>
                                <p class = "row" style = {{paddingLeft: '4px', paddingBottom: "2px", margin: '0px'}}>Số người: { this.state.numPerson }</p>
                            </div>
                            <div class = "col col-md-2" style={{alignItems: "right"}}>
                                <button class = "row btn btn-success btn-sm" type="button" style={{marginTop: "5px", fontSize: "13px", width:"65px"}}onClick={()=>this.guiAcceptRejectToUserRegisVolunteer("STATE_SAFE", false, Constant.emergency_location_regis)}>An toàn</button>
                                <button class = "row btn btn-primary btn-sm" type="button" style={{fontSize: "11px", width:"65px"}} onClick={()=>this.xemChitiet()}>Chi tiết</button>
                            </div>
                        </div>
                        {this.state.showChiTiet ? thongTinChiTiet : null}
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
