import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { useAdminLoginMutation } from '../../slices/adminApiSlice'
import { setadminCredentials } from '../../slices/authSlice'
import {toast} from 'react-toastify'

import './adminLogin.css'
const AdminLogin = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword]=useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [adminLogin]= useAdminLoginMutation()
    const {adminInfo} = useSelector((state)=>state.auth)
    useEffect(()=>{
        if(adminInfo){
         navigate('/profile')
        }
    },[navigate,adminInfo])

    const submitHandler=async (e)=>{
      
        e.preventDefault()
        try {
            const res = await adminLogin({email,password}).unwrap()
            dispatch(setadminCredentials({...res}))
            navigate('/profile')
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
        
       
          <input type="email" name='email'  value={email} onChange={()=>setEmail(event.target.value)} placeholder='enter email'  className="input" />
       
          <input type="password" name='password'    value={password} placeholder='password' onChange={()=>setPassword(event.target.value)}  className="input"  />
          <p className="page-link">
            <span className="page-link-label">Forgot Password?</span>
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