import React,{useState} from 'react'
import './login.css'
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword]=useState('')
  return (
    <>
        <div className='flex justify-center align-middle items-center'>
      <div className="form-container mt-6 ">
        <p className="title">Sign in</p>
        <form className="form" >
          <input type="email" name='email'  className="input" />
          <input type="password" name='password'  className="input"  />
          <p className="page-link">
            <span className="page-link-label">Forgot Password?</span>
          </p>
          <button type='submit'  className="form-btn bg-teal-400">Log in</button>
        </form>
        <p className="sign-up-label">
          Don't have an account?<span className="sign-up-link">  Sign up</span>
        </p>
      </div>
      </div>
    </>
  )
}

export default Login