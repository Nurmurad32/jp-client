import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from "react-router-dom";
import route from './route/route.jsx';
import { UserContextProvider } from './context/userContext.jsx';
import { Toaster } from 'react-hot-toast';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
    <Toaster />
      <RouterProvider router={route} />
    </UserContextProvider>
  </React.StrictMode>,
)
