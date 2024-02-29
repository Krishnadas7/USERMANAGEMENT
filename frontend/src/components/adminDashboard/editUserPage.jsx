import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './adminDashboard.css'
// import { useUpdateUserDataMutation } from '../../slices/adminApiSlice';



const EditUserPage = () => {
  
  const { userId } = useParams();

  return (
    <div className=' mt-[70px] ml-6'>
    <div className="container mx-auto mt-8 px-4">
<div className="max-w-md mx-auto  rounded-md overflow-hidden">
  <form className="p-6" >
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
      <textarea id="name"  className="h-[30px] border-none outline-none mt-1 block w-[300px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" rows=""></textarea>
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <textarea id="email"  type="email"  className="h-[30px] border-none outline-none mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" ></textarea>
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <textarea id="password"  placeholder='Enter password' type="password"  className="h-[30px] border-none outline-none mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" ></textarea>
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
  )
}

export default EditUserPage