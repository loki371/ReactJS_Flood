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
        console.log("UserItem : dashboard ", props.dashboard);

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

        else if (this.userRole === roleType.AUTHORITY && this.itemRole === roleType.AUTHORITY)
            this.state = {
                id : props.element.id,
                name : props.element.username,
                estate : props.element.state,

                dashboard : props.dashboard,
                element : props.element
            };
    }

    xemChitiet() {

    }

    guiAcceptRejectToUserRegis(newState1, accept) {
        //console.log("send acceptReject  id " + this.state.id + " oldState " + this.state.estate + " newState " + newState1);
        //console.log("token ", tokenData.data);
        Axios.defaults.headers.common['Authorization'] = tokenData.data;
        Axios.put(
            Constant.accept_reject_user_regis 
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
                    this.state.element.state = "STATE_AUTHENTICATED";
                    arrAccept.push(this.state.element);
                    console.log("thay doi state Accept");
                }
            } else {
                index = indexOfUsername(arrAccept, this.state.name);
                console.log("index reject ", index);
                if (index !== -1) {
                    arrAccept.splice(index, 1);
                    this.state.element.state = "STATE_UNAUTHENTICATED";
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

    render() {
        console.log("UserItem : ", this.state.name, " state ", this.state.estate);
        if (this.userRole === roleType.AUTHORITY && this.itemRole === roleType.USER) {
            if (this.state.estate === "STATE_UNAUTHENTICATED")
                return (
                    <div>
                        <h3>{ this.state.name }</h3>
                        <p>{ this.state.phone }</p>
                        <button type="button" onClick={()=>this.xemChitiet()}>Chi tiet</button>
                        <button type="button" onClick={()=>this.guiAcceptRejectToUserRegis("STATE_AUTHENTICATED", true)}>Them</button>
                    </div>
                )
            else 
                return (
                    <div>
                        <h3>{ this.state.name }</h3>
                        <p>{ this.state.phone }</p>
                        <button type="button" onClick={()=>this.xemChitiet()}>Chi tiet</button>
                        <button type="button" onClick={()=>this.guiAcceptRejectToUserRegis("STATE_UNAUTHENTICATED", false)} >Xoa</button>
                    </div>
                );

        } else if (this.userRole === roleType.AUTHORITY && this.itemRole === roleType.AUTHORITY) {
            if (this.state.estate === "STATE_UNAUTHENTICATED" || this.state.estate === null)
                return (
                    <div>
                        <h3>{ this.state.name }</h3>
                        <button type="button" onClick={()=>this.xemChitiet()}>Chi tiet</button>
                        <button type="button" onClick={()=>this.guiAcceptRejectToAuthRegis(true, Constant.auth_location_regis)}>Them</button>
                    </div>
                )
            else 
                return (
                    <div>
                        <h3>{ this.state.name }</h3>
                        <button type="button" onClick={()=>this.xemChitiet()}>Chi tiet</button>
                        <button type="button" onClick={()=>this.guiAcceptRejectToAuthRegis(false, Constant.auth_location_regis)} >Xoa</button>
                    </div>
                );
        }
    }
}

export default UserItem;

function indexOf(arr, id) {
    var i = 0;
    var j = -1;
    arr.forEach(item => {
        //console.log("indexOf, itemId ", item.id, " idCompare ", id);
        if (item.id === id) {
            j = i;
        }
        ++i;
    });
    return j;
}

function indexOfUsername(arr, name) {
    var i = 0;
    var j = -1;
    arr.forEach(item => {
        //console.log("indexOf, itemId ", item.id, " idCompare ", id);
        if (item.username === name) {
            j = i;
        }
        ++i;
    });
    return j;
}
