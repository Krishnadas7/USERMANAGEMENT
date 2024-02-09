import { Outlet,useLocation } from "react-router-dom"
import Login from "./components/login/login"
import Navbar from "./components/navbar/navbar"
import Signup from "./components/signup/signup"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
function App() {
//  const location = useLocation()
// const isHomepage = location.pathname =='/'
  return (
    <>
    {/* {isHomepage && <Navbar/>} */}
    <ToastContainer/>
    <Outlet/>
    </>
  )
}

export default App
