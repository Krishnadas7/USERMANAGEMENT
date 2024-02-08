import React from 'react'
import { Link } from 'react-router-dom'
const Signup = () => {
  return (
    <>
    <div className="flex justify-center align-middle items-center">
        <div className="form-container mt-6 ">
    <p className="title">Sign up</p>
    <form className="form">
        <input type="text" className="input" placeholder="Full Name" />
        <input type="email" className="input" placeholder="Email" />
        <input type="password" className="input" placeholder="Password" />
        <p className="page-link">
            <span className="page-link-label"> <Link to='/login'>Already have an account?</Link></span>
        </p>
        <button  className="form-btn"> Sign up</button>
    </form>
    <p className="sign-up-label">
        By signing up, you agree to our <a href="#" className="sign-up-link">Terms</a> and <a href="#" className="sign-up-link">Privacy Policy</a>.
    </p>
    {/* <div className="buttons-container">
        <div className="apple-login-button">
            Apple login button content
        </div>
        <div className="google-login-button">
            Google login button content
        </div>
    </div> */}
</div>
</div>
    </>
  )
}

export default Signup