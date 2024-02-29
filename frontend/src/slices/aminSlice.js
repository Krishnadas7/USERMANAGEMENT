import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
// import { authAdmin } from "../../../backend/controller/adminController";

const initialState ={
    adminInfo:localStorage.getItem('adminInfo')? JSON.parse(localStorage.getItem('adminInfo')):null
}
const adminSlice=createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        seteAdminCredentials:(state,action)=>{
            try {
                state.adminInfo=action.payload
                localStorage.setItem('adminInfo',JSON.stringify(action.payload))
            } catch (error) {
                console.error('Error storing admin information in localStorage:', error);   
            }
        },
        adminLogout:(state,action)=>{
          state.adminInfo=null
          localStorage.removeItem('adminInfo')
        }
    }
})

 export const {seteAdminCredentials,adminLogout} = adminSlice.actions
 export default adminSlice.reducer
