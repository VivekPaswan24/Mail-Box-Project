import "./App.css";
import AuthForm from "./components/Layout/AuthForm";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMailData } from "./store/mail-slice";


function App() {

  const dispatch=useDispatch()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <AuthForm /> },
        { path: "home", element: <HomePage/> },
      ],
    },
  ]);

  useEffect(()=>{
    dispatch(getMailData());
  },[dispatch])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
