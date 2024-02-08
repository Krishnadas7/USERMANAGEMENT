import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './login.css'
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword]=useState('')

    const submitHandler=(e)=>{
      
        e.preventDefault()
        console.log(email,password);
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
          <button type='submit'  className="form-btn bg-teal-400">Log in</button>
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