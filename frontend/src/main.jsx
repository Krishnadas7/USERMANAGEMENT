import React from 'react'
import ReactDOM from 'react-dom/client'
import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,RouterProvider
   } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
// import router from '../../backend/routes/userRoutes.js'
import Login from './components/login/login.jsx'
import Signup from './components/signup/signup.jsx'
import Navbar from './components/navbar/navbar.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'  element={<App/>}>
      <Route path='/' element={<Navbar/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<Signup/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
