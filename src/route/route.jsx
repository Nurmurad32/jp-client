import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import RootL from '../layout/RootL';
import axios from 'axios';
import CreateJob from '../components/CreateJob';
import AuthL from '../layout/AuthL';
import PrivateRoute from './PrivateRoute';

// axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.baseURL = 'https://job-portal-server-five-eta.vercel.app'; 
axios.defaults.withCredentials = true; 

const route = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute><RootL /></PrivateRoute>,
      children:[
        {path:'/', element: <PrivateRoute><Home /></PrivateRoute>},
        {path:'/create', element: <PrivateRoute><CreateJob /></PrivateRoute>},
        {path:'/job/edit/:id', element: <PrivateRoute><CreateJob /></PrivateRoute>},
      ]
    },
    {
      path: "/",
      element: <AuthL />,
      children:[
        {path:'/login', element: <Login />},
        {path:'/register', element: <Register />},
      ]
    },
    {
      path: '*',
      element: <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h2>Page Not Found</h2>
      </div>
  },
  ]);

export default route;