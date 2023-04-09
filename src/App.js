import "./App.css";
import AuthForm from "./components/Layout/AuthForm";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomeLayout from "./pages/Home";
import ComposeMail from "./components/ComposeMail/ComposeMail";
import Inbox from "./components/Layout/Inbox/Inbox";
import MailMessage from "./components/Layout/Inbox/MailMessage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMail } from "./store/mail-slice";
import Sentbox from "./components/Layout/Sentbox/Sentbox";

function App() {
  const auth=useSelector(state=>state.auth)

  const dispatch=useDispatch();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <AuthForm /> },
        { path: "home", element: <HomeLayout/>, children:[
          {index: true,element: <ComposeMail/>},
          {path:'inbox',element:<Inbox/>},
          {path:'inbox/:mailId',element:<MailMessage/>},
          {path:'/home/sentbox',element:<Sentbox/>}
        ] },
      ],
    },
  ]);

  // setInterval(()=>{
  //   dispatch(getMail())
  // },2000)
  useEffect(()=>{
    dispatch(getMail())
  },[dispatch,auth])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
