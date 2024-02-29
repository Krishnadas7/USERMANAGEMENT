import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { useAdminLoginMutation } from '../../slices/adminApiSlice'
// import { setadminCredentials } from '../../slices/authSlice'
import { seteAdminCredentials } from '../../slices/aminSlice'
import {toast} from 'react-toastify'

import './adminLogin.css'
const AdminLogin = () => {
  console.log('admin log');

    const [email,setEmail] = useState('')
    const [password,setPassword]=useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [adminLogin]= useAdminLoginMutation()
    const {adminInfo} = useSelector((state)=>state.admin)
    // console.log('admin-infooo',adminInfo);
    useEffect(()=>{
        if(adminInfo){
         navigate('/adminprofile')
        }
    },[navigate,adminInfo])

    const submitHandler=async (e)=>{
      
        e.preventDefault()
        try {
            const res = await adminLogin({email,password}).unwrap()
            dispatch(seteAdminCredentials({...res}))
            navigate('/adminprofile')
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
  return (
    <>
        <div className='flex justify-center align-middle items-center'>
      <div className="form-container mt-6 ">
        <p className="title">Admin sign in</p>
        <form className="form" onSubmit={submitHandler} > 
        
       
          <input type="email" name='email'  value={email} onChange={(event)=>setEmail(event.target.value)} placeholder='enter email'  className="input" />
       
          <input type="password" name='password'    value={password} placeholder='password' onChange={(event)=>setPassword(event.target.value)}  className="input"  />
          <p className="page-link">
            {/* <span className="page-link-label">Forgot Password?</span> */}
          </p>
          <button type='submit'  className="form-btn bg-black">Log in</button>
        </form>
        {/* <p className="sign-up-label">
          Don't have an account?<span className="sign-up-link"><Link to='/signup'> Sign up</Link> </span>
        </p> */}
      </div>
      </div>
    </>
  )
}

export default AdminLogin