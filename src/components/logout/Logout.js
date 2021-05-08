import UserData from "../app/UserData"

import Login from "../login/Login"
import Constant from "../../constant"

export default function Logout() {
    const { tokenData, usernameData, roleData } = UserData();
    
    console.log("Logout!");

    tokenData.delete();
    usernameData.delete();
    roleData.delete();

    console.log("afterLogout: token = " + tokenData.data + 
                "; username = " + usernameData.data +
                "; role = " + roleData.data);

    window.location.replace(Constant.login_client);

    return <Login/>;
}