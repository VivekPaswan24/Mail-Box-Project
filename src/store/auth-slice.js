import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: token ? true : false,
    token: token ? token : null,
  },
  reducers:{
    login(state,action){
        state.isLoggedIn=true;
        state.token=action.payload
    },
    logout(state){
        state.isLoggedIn=false;
        state.token=null
        localStorage.removeItem('token')
    }
  }
});

export const authActions=authSlice.actions;

export default authSlice.reducer
