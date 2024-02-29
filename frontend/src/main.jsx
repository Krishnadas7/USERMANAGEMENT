import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store.js'
import { Provider } from 'react-redux'
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
import PrivateRouter from './components/private/privateRouter.jsx'
import Profile from './components/profile/profile.jsx'
import AdminLogin from './components/adminLogin/adminLogin.jsx'
import AdminProfile from './components/adminProfile/adminProfile.jsx'
import AdminPrivateRouter from './components/private/adminPrivateRouter.jsx'
import EditUserPage from './components/adminDashboard/editUserPage.jsx'
import UserAdd from './components/adminDashboard/userAdd.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'  element={<App/>}>
      <Route path='/' element={<Navbar/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/admin' element={<AdminLogin/>}/>


       <Route path='' element={<AdminPrivateRouter/>}>
       <Route path='/adminprofile' element={<AdminProfile/>}/>
       <Route path="/edit-user/:userId" element={<EditUserPage/>}/>
       <Route path='/user-add' element={<UserAdd/>}/>
       </Route>

       
       <Route path='/signup' element={<Signup/>}/>
       <Route path='' element={<PrivateRouter/>}>
       <Route path='/profile' element={<Profile/>}/>
       </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
  </Provider>
)
