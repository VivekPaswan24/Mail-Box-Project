import "./App.css";
import AuthForm from "./components/Layout/AuthForm";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import WelcomePage from "./pages/Welcome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMailData, sendMailData } from "./store/mail-slice";

let initial = true;

function App() {
  const mail = useSelector((state) => state.mail);
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <AuthForm /> },
        { path: "welcome", element: <WelcomePage /> },
      ],
    },
  ]);

  useEffect(() => {
    if (initial === true) {
      initial = false;
      dispatch(getMailData());
      return;
    }
    dispatch(sendMailData(mail));
  }, [mail, dispatch]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
