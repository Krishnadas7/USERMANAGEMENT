import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/authSlice';
import { useSetImgMutation } from '../../slices/userApiSlice';
import axios from 'axios'
import Navbar from '../navbar/navbar';
import logo from '../../assets/avatar.jpg';

const Profile = () => {

  
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setImage(userInfo.profileImg);
  }, [userInfo]);
   
  const handleImageChange=(e)=>{
    setImage(e.target.files[0])
  }
  const handleSaveImage = async (e) => {
   e.preventDefault()
    console.log('handlesaveimage');
    if (!image) {
        return;
    }
    
    const userId = userInfo._id ||userInfo.id;
    console.log('usd:', userId);
    console.log('image:', image);
    
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('image', image);
    
    try {
        const response = await axios.post('http://localhost:5000/api/users/add-profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('responsedata:', response.data);
        const updatedUserInfo = { ...userInfo, profileImg: response.data.profileImg };
        dispatch(setCredentials(updatedUserInfo));
    } catch (error) {
        console.error('Error saving image:', error.message);
    }
};



  const submitHandler = async (e) => {
    e.preventDefault();
   
    if (password !== cpassword) {
      toast.error('Passwords do not match');
      return
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
    const mobileRegex = /^(?![0-5])\d{10}$/;
    const nameRegex = /^[^\s]+(\s[^\s]+)*$/;

    // Check if any field is empty
    if (!name || !email || !password) {
      toast.error("All fields should be filled");
    } else if (!name.match(nameRegex)) {
        toast.error("Name cannot contain consecutive spaces");
    } else if (!password.match(passwordRegex)) {
      toast.error(
        "Password must be at least 6 characters and contain at least one special character"
      );
    } else if (password !== cpassword) {
      toast.error("Password do not match");
    
    }else {
      try {
        const res = await updateUser({
          _id: userInfo._id,
          name,
          email,
          password
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Navbar />
     
      <div className='flex justify-center items-center mt-10'>
        <div className='w-full max-w-screen-md mx-4 flex justify-center'>
          <div className='w-1/3'>
            <div className='flex justify-center items-center'>
              <input
                type='file'
                id='fileInput'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <label htmlFor='fileInput' className='cursor-pointer'>
                <img
                  className='h-60 w-60 rounded-full object-cover'
                  src={image ? `http://localhost:5000/static/images/${image}`:logo }
                  alt='Profile'
                />
              </label>
            </div>
            <button onClick={handleSaveImage}
              className='mt-4 h-10 w-full hover:bg-green-500 bg-black rounded-lg text-white hover:scale-105'
            >
              Save Image
            </button>
          </div>
          <div className='w-2/3'>
            <form onSubmit={submitHandler} className='mx-4'>
              <div className='mb-4'>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                  Name
                </label>
                <input
                  id='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='h-10 pl-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='h-10 border pl-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <input
                  id='password'
                  placeholder='Enter password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='h-10 border pl-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='cpassword' className='pl-2 block text-sm font-medium text-gray-700'>
                  Confirm Password
                </label>
                <input
                  id='cpassword'
                  placeholder='Confirm your password'
                  type='password'
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  className='h-10 border pl-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm'
                />
              </div>
              <div className='text-center'>
                <button
                  type='submit'
                  className='inline-block h-10 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
