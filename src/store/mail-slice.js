import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { uiActions } from "./ui-slice";

const initialMailState = { sentbox: [], inbox: [] };

const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    sentBox(state, action) {
      state.sentbox = state.sentbox.concat(action.payload);
    },
    inBox(state, action) {
      state.inbox = action.payload;
    },
    replaceData(state, action) {
      state.sentbox = action.payload;
    },
  },
});


export const getMailData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Please Wait..",
      })
    );
    try {
      const response = await axios.get(
        "https://mail-box-project-c3098-default-rtdb.firebaseio.com/mail.json"
      );
      console.log(response)
      const data=response.data
      let loadedsendData = [];
      let loadedInboxData = [];
      const email = localStorage.getItem("email");
      // // console.log(email);
      for(const key in data){
        if(data[key].mail.to===email){
          loadedInboxData.push(data[key].mail)
        }else{
          loadedsendData.push(data[key].mail)
        }
      }
      dispatch(mailActions.inBox(loadedInboxData));
      dispatch(mailActions.replaceData(loadedsendData));
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Successfully get data.",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Failed!",
          message: error.response.data.error.message,
        })
      );
    }
    setTimeout(() => {
      dispatch(uiActions.closeNotification());
    }, 3000);
  };
};

console.log(initialMailState);
export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
