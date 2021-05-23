import React from 'react';
import Constant from "../../constant";
import Axios from "axios";
import UserData from "../app/UserData";

const userData = UserData();
var roleData = userData.roleData;
var tokenData = userData.tokenData;
var usernameData = userData.usernameData;

class UserItem extends React.Component {
    constructor(props) {
        super(props);
        console.log("UserItem : dashboard ", props.dashboard);
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
    }

    xemChitiet() {

    }

    guiAcceptReject(newState1, accept) {
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

            console.log("guiAcceptReject : arrAc ", arrAccept);
            console.log("guiAcceptReject : arrRe ", arrRequest);

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

    render() {
        console.log("UserItem : ", this.state.name, " state ", this.state.estate);
        
        if (this.state.estate === "STATE_UNAUTHENTICATED")
            return (
                <div>
                    <h3>{ this.state.name }</h3>
                    <p>{ this.state.phone }</p>
                    <button type="button" onClick={()=>this.xemChitiet()}>Chi tiet</button>
                    <button type="button" onClick={()=>this.guiAcceptReject("STATE_AUTHENTICATED", true)}>Them</button>
                </div>
            )
        else 
            return (
                <div>
                    <h3>{ this.state.name }</h3>
                    <p>{ this.state.phone }</p>
                    <button type="button" onClick={()=>this.xemChitiet()}>Chi tiet</button>
                    <button type="button" onClick={()=>this.guiAcceptReject("STATE_UNAUTHENTICATED", false)} >Xoa</button>
                </div>
            );
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
        }
        ++i;
    });
    return j;
}
