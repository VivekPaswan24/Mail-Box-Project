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

console.log(initialMailState);

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
      console.log(response.data);
      const data = response.data.mail.sentbox;
      let loadedsendData = [];
      let loadedInboxData = [];
      const email = localStorage.getItem("email");
      data.forEach((element) => {
        if (element.to === email) {
          loadedInboxData.push(element);
        } else {
          loadedsendData.push(element);
        }
      });
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

export const sendMailData = (mail) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Please Wait..Sending data.",
      })
    );
    try {
      await axios.put(
        "https://mail-box-project-c3098-default-rtdb.firebaseio.com/mail.json",
        { mail }
      );
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Successfully send data.",
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
