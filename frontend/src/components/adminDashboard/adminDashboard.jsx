import React from 'react'
import  UserTable  from './userTable.jsx'
import {  useSelector } from 'react-redux'
const AdminDashboard = () => {
  const {userInfo}=useSelector((state)=>state.auth)
  // console.log('userInfooooProfilee',userInfo.name);
  return (
    <div>
        <UserTable/>
    </div>
  )
}

export default AdminDashboard