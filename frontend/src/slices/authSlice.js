import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            try {
              state.userInfo = action.payload;
              localStorage.setItem('userInfo', JSON.stringify(action.payload));
            } catch (error) {
              console.error('Error storing user information in localStorage:', error);
            }
          },
        logout: (state,action) =>{
            state.userInfo = null
            localStorage.removeItem('userInfo')
        },
        setadminCredentials: (state, action) => {
          try {
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload));
          } catch (error) {
            console.error('Error storing user information in localStorage:', error);
          }
        },
        adminLogout: (state,action) =>{
          state.adminInfo = null
          localStorage.removeItem('adminInfo')
      },
    }
})
export const {setCredentials,logout,setadminCredentials,adminLogout} = authSlice.actions
export default authSlice.reducer