import React, { useState } from 'react';
import { useAddUserMutation } from '../../slices/adminApiSlice';
import { useNavigate } from 'react-router-dom';

const UserAdd = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addUser, { isLoading, isError, error }] = useAddUserMutation();
  const navigate= useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addUser({ name, email, password });
         navigate('/adminprofile')
      console.log('User added:', response);
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  return (
    <>
   
    <div className='mt-20 mx-auto max-w-md'>
    <h1 className='font-sans text-5xl mb-3 ml-4 text-gray-600 text-lg;' >ADD USER</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
  <div>
    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
      Name
    </label>
    <textarea
      id='name'
      value={name}
      onChange={(e) => setName(e.target.value)}
      className='input-field w-[300px]'
    />
  </div>
  <div>
    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
      Email
    </label>
    <textarea
      id='email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className='input-field w-[300px]'
    />
  </div>
  <div>
    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
      Password
    </label>
    <textarea
      id='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className='input-field w-[300px]'
    />
  </div>
  <div>
    <button
      type='submit'
      className='w-[300px] px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
      disabled={isLoading}
    >
      {isLoading ? 'Adding user...' : 'ADD USER'}
    </button>
    {isError && <p className='text-red-500'>{error}</p>}
  </div>
</form>

    </div>
    </>
  );
};

export default UserAdd;
