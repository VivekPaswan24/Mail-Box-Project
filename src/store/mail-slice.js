import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { uiActions } from "./ui-slice";

const initialMailState = { sentBox:[],inBox:[] };

const mailSlice=createSlice({
  name:'mail',
  initialState:initialMailState,
  reducers:{
    sentBox(state,action){
      state.sentBox=state.sentBox.concat(action.payload)
    },
    replaceSentBox(state,action){
      state.sentBox=action.payload
    },
    replaceInBox(state,action){
      state.inBox=action.payload
    },
    updateInbox(state,action){
      const existingMailIndex=state.inBox.findIndex((ele)=>ele.id===action.payload.id);
      state.inBox[existingMailIndex]=action.payload
    },
    deleteMail(state,action){
      state.inBox=state.inBox.filter((ele)=>ele.id!==action.payload)
    }
  }
});

export const addData=(mail)=>{
  return async(dispatch)=>{
    const receiverMail=mail.to.replace('@','').replace('.','');
    const senderMail=mail.from.replace('@','').replace('.','');
    dispatch(uiActions.showNotification({status:'pending',title:'Sending...',message:'Please Wait..Sending data.'}))
    try{
      const response=await axios.post(`https://mail-box-project-c3098-default-rtdb.firebaseio.com/${senderMail}.json`,{mail});
      await axios.post(`https://mail-box-project-c3098-default-rtdb.firebaseio.com/${receiverMail}.json`,{mail});
      console.log('success')
      dispatch(uiActions.showNotification({status:'success',title:'Success!',message:'Successfully Send Data!'}))
      dispatch(mailActions.sentBox({...mail,id:response.data.name}))
    }catch(err){
      console.log(err)
      dispatch(uiActions.showNotification({status:'error',title:'Error!',message:'Failed to send data'}))
    }
    setTimeout(()=>{
      dispatch(uiActions.closeNotification());
    },2000)
  }
}

export const getMail=()=>{
  return async (dispatch)=>{
    const email=localStorage.getItem('email')
 const newEmail= email.replace('@',"").replace('.','');
  try{
    const response=await axios.get(`https://mail-box-project-c3098-default-rtdb.firebaseio.com/${newEmail}.json`)
    let loadedInboxData=[];
    const data=response.data;
    for(const key in data){
      if(data[key].mail.to===email){
        loadedInboxData.push({...data[key].mail,id:key})
      }
    }
    console.log(loadedInboxData);
    dispatch(mailActions.replaceInBox(loadedInboxData))

  }catch(error){
    console.log(error)
  }
  }
}

export const deleteMail=(id)=>{
  return async(dispatch)=>{
    const email=localStorage.getItem('email').replace('@','').replace('.','');
    try{
      await axios.delete(`https://mail-box-project-c3098-default-rtdb.firebaseio.com/${email}/${id}.json`);
      dispatch(mailActions.deleteMail(id))
    }catch(error){
      console.log(error)
    }
  }
}

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
