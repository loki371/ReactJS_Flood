import UserData from "../app/UserData"

export default function Logout() {
    const { tokenData, usernameData, roleData } = UserData();
    
    console.log("Logout!");

    tokenData.delete();
    usernameData.delete();
    roleData.delete();

    console.log("afterLogout: token = " + tokenData.data + 
                "; username = " + usernameData.data +
                "; role = " + roleData.data);

    return;
}