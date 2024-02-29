import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { useLoginMutation } from '../../slices/userApiSlice'
import { setCredentials } from '../../slices/authSlice'

import {toast} from 'react-toastify'

import './login.css'
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword]=useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login,{isLoading}] = useLoginMutation()
    const {userInfo} = useSelector((state)=>state.auth)
      console.log('userInfo',userInfo);
    useEffect(()=>{
        if(userInfo){
         navigate('/')
        }
    },[navigate,userInfo])

    const submitHandler=async (e)=>{
      
        e.preventDefault()
        try {
            const res = await login({email,password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/')
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
  return (
    <>
        <div className='flex justify-center align-middle items-center'>
      <div className="form-container mt-6 ">
        <p className="title">Sign in</p>
        <form className="form" onSubmit={submitHandler}>
          <input type="email" name='email' placeholder='enter email' value={email} onChange={()=>setEmail(event.target.value)} className="input" />
          <input type="password" name='password' value={password} placeholder='password' onChange={()=>setPassword(event.target.value)}  className="input"  />
          <p className="page-link">
            <span className="page-link-label">Forgot Password?</span>
          </p>
          <button type='submit'  className="form-btn bg-black">Log in</button>
        </form>
        <p className="sign-up-label">
          Don't have an account?<span className="sign-up-link"><Link to='/signup'> Sign up</Link> </span>
        </p>
      </div>
      </div>
    </>
  )
}

export default Login