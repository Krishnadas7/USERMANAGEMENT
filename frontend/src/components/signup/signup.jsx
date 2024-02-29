import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../slices/userApiSlice'
import {toast} from 'react-toastify'
import { setCredentials } from '../../slices/authSlice'
import {useDispatch,useSelector } from 'react-redux'


const Signup = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [register] = useRegisterMutation()
    const {userInfo} = useSelector((state)=>state.auth)
    const navigate =useNavigate()
   const dispatch = useDispatch()

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate,userInfo])

   
    const handleSubmit = async (e)=>{
        e.preventDefault()

        const emailRegex = /^\S+@\S+\.\S+$/;
        const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
        const mobileRegex = /^(?![0-5])\d{10}$/;
        const nameRegex = /^[^\s]+(\s[^\s]+)*$/;
    
        // Check if any field is empty
        if (!name || !email || !password) {
          toast.error("All fields should be filled");
        } else if (!name.match(nameRegex)) {
            toast.error("Name cannot contain consecutive spaces");
        }  else if (!email.match(emailRegex)) {
              toast.error("Invalid email address");
        } else if (!password.match(passwordRegex)) {
          toast.error(
            "Password must be at least 6 characters and contain at least one special character"
          );
        }  else {
        try {
            const res = await register({name,email,password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/login')

        } catch (err) {
           toast.error(err?.data?.message || err.error)   
        }
    }
        
    }

  return (
    <>
    <div className="flex justify-center align-middle items-center">
        <div className="form-container mt-6 ">
    <p className="title">Sign up</p>
    <form className="form" onSubmit={handleSubmit}>
        <input type="text" className="input" value={name} onChange={()=>setName(event.target.value)} placeholder="Full Name" />
        <input type="email" className="input" value={email} onChange={()=>setEmail(event.target.value)} placeholder="Email" />
        <input type="password" className="input" value={password} onChange={()=>setPassword(event.target.value)} placeholder="Password" />
        <p className="page-link">
            <span className="page-link-label"> <Link to='/login'>Already have an account?</Link></span>
        </p>
        <button type='submit' className="form-btn bg-black"> Sign up</button>
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