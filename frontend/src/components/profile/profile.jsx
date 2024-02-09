import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector } from 'react-redux'
import { useUpdateUserMutation } from '../../slices/userApiSlice'
import Navbar from '../navbar/navbar'
import logo from '../../assets/avatar.jpg'
import { toast } from 'react-toastify'
import { setCredentials } from '../../slices/authSlice'


const Profile = () => {
    const [selectedImage, setSelectedImage] = useState(""); // State to store the selected image URL
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [cpassword,setCpassword]= useState('')
    const [updateUser]=useUpdateUserMutation()
    const dispatch = useDispatch()
    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{
      setName(userInfo.name)
      setEmail(userInfo.email)
    },[userInfo.setName,userInfo.setEmail])

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setSelectedImage(imageUrl); 
    }
  };
  const submitHandler=async (e)=>{
   e.preventDefault()
   if(password=== ''||cpassword==="" ){
    toast.error('please enter your password')
    return
 }
   if(password!==cpassword ){
      toast.error('password do not matched')
   }else{
    try {
      const res = await updateUser({
        _id:userInfo._id,
        name,
        email,
        password
      }).unwrap()
      dispatch(setCredentials({...res}))
      toast.success('profile updated')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }

   }
  }

  return (
    <>
    <Navbar/>    
    <div className=' flex w-full h-[510px] justify-center '>
        <div className='flex justify-center mt-[110px]'>
          <div>
            
           
             <div className="relative w-[200px] h-[200px] overflow-hidden rounded-full bg-gray-200">
             <img id='iii'  src={selectedImage} alt="" />
             <input onChange={handleFileInputChange} id="dropzone-file" type="file" class="absolute inset-0 w-full h-full opacity-0" />
              <img src={logo}  alt="Avatar" className="object-cover w-full h-full" />
              </div>

              {/* {selectedImage === "" && <img src={logo} alt="Placeholder" className="object-cover w-full h-full" />} */}

        
         </div> 
          </div>
          <div className=' mt-[70px] ml-6'>
          <div className="container mx-auto mt-8 px-4">
      <div className="max-w-md mx-auto  rounded-md overflow-hidden">
        <form className="p-6" onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <textarea id="name" value={name} onChange={(e)=>setName(e.target.value)} className="h-[30px] border-none outline-none mt-1 block w-[300px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" rows=""></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <textarea id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="h-[30px] border-none outline-none mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <textarea id="password" placeholder='Enter password' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="h-[30px] border-none outline-none mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <textarea id="password" placeholder='Confirm your password' value={cpassword} onChange={(e)=>setCpassword(e.target.value)} type="password" className="h-[30px] border-none outline-none mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" ></textarea>
          </div>
          
          <div className="text-center">
            <button type="submit" className="inline-block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
        </div>
    </div>
    </>
  )
}

export default Profile