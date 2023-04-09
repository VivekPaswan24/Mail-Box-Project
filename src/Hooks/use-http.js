import axios from "axios";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { useCallback } from "react";
const useHttp = () => {
  const dispatch = useDispatch();
  const sendRequest = useCallback(async (requestConfig, applyData) => {
      if (requestConfig.methode === "post") {
        dispatch(
          uiActions.showNotification({
            status: "pending",
            title: "Sending...",
            message: "Please Wait..Sending data.",
          })
        );
      const senderMail = requestConfig.mail.from
        .replace("@", "")
        .replace(".", "");
      const receiverMail = requestConfig.mail.to
        .replace("@", "")
        .replace(".", "");
      const mail = requestConfig.mail;
      try {
        const response = await axios.post(
          `${requestConfig.url}/${senderMail}.json`,
          { mail }
        );
        await axios.post(`${requestConfig.url}/${receiverMail}.json`, { mail });
        console.log("success");
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Successfully Send Data!",
          })
        );
        applyData(response.data);
      } catch (err) {
        console.log(err);
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Failed to send data",
          })
        );
      }
      setTimeout(() => {
        dispatch(uiActions.closeNotification());
      }, 1000000);
    }
    if (requestConfig.methode === "get") {
      const email = localStorage.getItem("email");
      const newEmail = email.replace("@", "").replace(".", "");
      try {
        const response = await axios.get(
          `${requestConfig.url}/${newEmail}.json`
        );

        applyData(response.data);
      } catch (error) {
        console.log(error);

      }
    }
  }, [dispatch]);

  return sendRequest;
};

export default useHttp;
