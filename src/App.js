import './App.css';
import AuthForm from './components/Layout/AuthForm';

import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root';
import WelcomePage from './pages/Welcome';

function App() {

  const router=createBrowserRouter([
    {path:'/',element:<RootLayout/>,children:[
      {index:true,element:<AuthForm/>},
      {path:'welcome',element:<WelcomePage/>}
    ]}
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
