import "./App.css";
import AuthForm from "./components/Layout/AuthForm";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomeLayout from "./pages/Home";
import ComposeMail from "./components/ComposeMail/ComposeMail";
import Inbox from "./components/Layout/Inbox/Inbox";
import MailMessage from "./components/Layout/Inbox/MailMessage";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sentbox from "./components/Layout/Sentbox/Sentbox";
import useHttp from "./Hooks/use-http";

import { mailActions } from "./store/mail-slice";

function App() {
  const auth=useSelector(state=>state.auth)

  const dispatch=useDispatch();

  const sendRequest=useHttp();
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

  const fetchData=useCallback((data)=>{
    const email=localStorage.getItem('email')
    let loadedInboxData=[];
    let loadedSentBox=[]
    console.log(data)
    for(const key in data){
      if(data[key].mail.to===email){
        loadedInboxData.push({...data[key].mail,id:key})
      }
      if(data[key].mail.from===email){
        loadedSentBox.push({...data[key].mail,id:key})
      }
    }
    console.log(loadedInboxData);
    dispatch(mailActions.replaceInBox(loadedInboxData))
    dispatch(mailActions.replaceSentBox(loadedSentBox))
  },[dispatch])
  useEffect(()=>{
    const interval=setInterval(()=>{
      sendRequest({url:'https://mail-box-project-c3098-default-rtdb.firebaseio.com',methode:'get'},fetchData)
      console.log('hi')
    },2000);

    return ()=>clearInterval(interval)
  },[fetchData,sendRequest])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
