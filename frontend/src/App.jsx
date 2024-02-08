import { Outlet,useLocation } from "react-router-dom"
import Login from "./components/login/login"
import Navbar from "./components/navbar/navbar"
import Signup from "./components/signup/signup"

function App() {
//  const location = useLocation()
// const isHomepage = location.pathname =='/'
  return (
    <>
    {/* {isHomepage && <Navbar/>} */}
    <Outlet/>
    </>
  )
}

export default App
