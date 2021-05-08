import { useState } from 'react';

var CRUDData = nameData => {
  const getData = () => {
    const dataString = localStorage.getItem(nameData);
    const userData = JSON.parse(dataString);

    console.log(userData);
    
    return userData
  };

  const [data, updateData] = useState(getData());

  const saveData = userData => {
    localStorage.setItem(nameData, JSON.stringify(userData));
    updateData(userData);
  };

  const deleteData = () => {
    localStorage.removeItem(nameData);
    updateData(null);
  }

  return {
    data: data,
    set: saveData,
    delete: deleteData,
  }
}

export default function UserData() {  
  const token = CRUDData('token');
  const username = CRUDData('username');
  const role = CRUDData('role');

  return {
    token: token.data,
    setToken: token.set,
    deleteToken: token.delete,
    
    username: username.data,
    setUsername: username.set,
    deleteUsername: username.delete,

    role: role.data,
    setRole: role.set,
    deleteRole: role.delete
  }
}