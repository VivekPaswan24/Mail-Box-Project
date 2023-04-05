import { createSlice } from "@reduxjs/toolkit";

const uiSlice=createSlice({
    name:'ui',
    initialState:{notification:null,showCompose:false,showInbox:false},
    reducers:{
        showNotification(state,action){
            state.notification={status:action.payload.status,title:action.payload.title,message:action.payload.message}
        },
        closeNotification(state){
            state.notification=null;
        },
        showCompose(state){
            state.showCompose=true
            state.showInbox=false
        },
        showInbox(state){
            state.showCompose=false;
            state.showInbox=true
        }
    }
});

export const uiActions=uiSlice.actions;

export default uiSlice.reducer;