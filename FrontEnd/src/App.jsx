import Signup from './components/Signup';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Setting from './components/setting';
import Profile from "./components/Profile";
import Navbar from './components/Navbar';
import { userAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

import {Loader} from "lucide-react"






const brousingRouter = createBrowserRouter([
  {
    path:"/",
    element:<Navbar/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/profile',
        element:<Profile/>
      },{
        path:'/Setting',
        element:<Setting/>
      },
      {
        path:'/login',
        element:<Login/>
      }, {
        path:"/signup",
        element:<Signup/>
      },
    ]
  }
]);

function App() {

    const {authUser,checkAuth,isCheckingAuth}=userAuthStore();

    if(isCheckingAuth && !authUser)return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin"/>
      </div>
    )

    useEffect(()=>{
      checkAuth();
    },[checkAuth]);

  return (
    <>
      
    <RouterProvider router={brousingRouter}/> 

    </>
    
  )
}

export default App