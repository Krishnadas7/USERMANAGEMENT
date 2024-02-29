import React,{useState,useEffect} from 'react'
import { useGetUserDataMutation,useDeleteUserMutation,useUpdateUserDataMutation } from '../../slices/adminApiSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import './adminDashboard.css'
import image from '../../assets/avatar.jpg'
import { Link } from 'react-router-dom'
import Modal from "./Modal";




const UserTable = () => {    const [users,setUsers] = useState([])
   const [editname,seteditName]=useState('')
   const [editemail,seteditEmail]=useState('')
   const [editpassword,setditPassword]=useState('')

    const [search, setSearch] = useState("");
    const [data,setData] = useState(true)
    const [open,setOpen]=useState(false)
    const [userId, setUserId] = useState(null);
    const [edituserid,setEdituserid]=useState(null)
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [getUserData] = useGetUserDataMutation()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser]=useUpdateUserDataMutation()
    const {userInfo} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClose=()=>{
      setOpen(close)
    }

    const handleOpen = async (userId) => {
      const user = filteredUsers.find(user => user._id === userId);
      if (user) {
        seteditName(user.name);
        seteditEmail(user.email);
        setEdituserid(userId)
        setditPassword('');
        setOpen(true);
      }
    }
    

    useEffect(()=>{
        async function fetchUser(){
            const res= await getUserData().unwrap()
            setUsers(res.user)
        }
        fetchUser()
    },[data,getUserData])

    useEffect(() => {
        const filterUsers = () => {
          const filtered = users.filter((user) => {
            const userName = user.name.toLowerCase();
            const userEmail = user.email.toLowerCase();
            const searchValue = search.toLowerCase();
            return userName.includes(searchValue) || userEmail.includes(searchValue);
          });
          setFilteredUsers(filtered);
        };
        filterUsers();
      }, [users, search]);
       
      const handleSearch = (e) => {
        setSearch(e.target.value);
      };
      
      const handleDelete = async (userId) => {
        setUserId(userId);
        if (userId) {
          await deleteUser(userId).unwrap("");
          setData((prevData) => !prevData);
          setUserId(null);
          // setIsOpen(false);
          if (userInfo && userInfo._id === userId) {
            dispatch(logOut());
          }
        }
      };
      const editUser=async ()=>{

       
        if(edituserid){
          const user={
            _id:edituserid,
            name:editname,
            email:editemail,
            password:editpassword
          }
         const res= await updateUser(user).unwrap()
         console.log('resssss',res);
        }
        setEdituserid(null)
        setOpen(close)
     
      }
     
  return (
    <>
    <div className='mx-[200px] m-2'>
     <div className="flex flex-col" >
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 m-5" >
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
          {/* <input
                  type='text'
                  value={search}
                  onChange={handleSearch}
                  placeholder='Search by name or email...'
                  className='border px-2 py-1 rounded-md mb-4'
                /> */}

<input
  value={search} 
  onChange={handleSearch}
   className="rounded-full 
    bg-violet-100 text-xl border-2
     border-green-500 p-3
      placeholder-purple-400
       focus:text-violet-950
        focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
  placeholder='Search by name or email...'
/>
          <button onClick={()=>navigate('/user-add')}
  className="rounded-lg ml-[800px] relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
>
  <span
    className="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300"
    >Add Item</span
  >
  <span
    className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"
  >
    <svg
      className="svg w-8 text-white"
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="12" x2="12" y1="5" y2="19"></line>
      <line x1="5" x2="19" y1="12" y2="12"></line>
    </svg>
  </span>
</button>
          <table  className="min-w-full  text-center text-sm font-light ">
  <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
    <tr>
      <th scope="col" className="px-6  py-4">Name</th>
      <th scope="col" className="px-6 py-4">Email</th>
      <th scope="col" className="px-6 py-4"></th>
      <th scope="col" className="px-6 py-4"></th>
    </tr>
  </thead>
  <tbody>
    {
        filteredUsers.map((obj,index)=>(
            <tr key={index} className="border-b dark:border-neutral-500">
      <td className="whitespace-nowrap px-6 ">
        <div className="flex items-center">
          <img className="w-20 h-20 rounded-full mr-2" src={obj.profileImg ? `http://localhost:5000/static/images/${obj.profileImg}`:image} alt="" /> 
          <span className='ml-10'><b>{obj.name}</b></span> 
        </div>
      </td>
      <td className="whitespace-nowrap px-6 "><b>{obj.email}</b></td>
     <td>
     <button onDoubleClick={handleClose} onClick={()=>handleOpen(obj._id)} className="edit-button">
  <svg className="edit-svgIcon" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
</button>
     </td>
      <td className="whitespace-nowrap px-6 ">
        <button onClick={() => handleDelete(obj._id)} className="user-btn">Delete</button>
      </td>
    </tr>
        ))
    }
   
   
  </tbody>
</table>

         {open &&  ( <div  className='absolute rounded-2xl z-10 left-[450px]  bottom-[85px] '  >
        <div className=' mt-[70px]  ml-6 bg-slate-500 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-slate-500 duration-300 ...'>
    <div className="container mx-auto mt-8 px-4">
<div className="max-w-md mx-auto  rounded-md overflow-hidden">
  <form className="p-6" onSubmit={editUser}>
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
      <textarea
  id="name"
  value={editname}
  onChange={(e) => seteditName(e.target.value)}
  className="h-[40px] pl-2 pt-1 border-none outline-none mt-1 block w-[300px] border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  rows=""
></textarea>
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <textarea
  id="email"
  value={editemail}
  onChange={(e) => seteditEmail(e.target.value)}
  type="email"
  className="h-[40px] pl-2 pt-1 border-none outline-none mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
></textarea>
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <textarea
  id="password"
  value={editpassword}
  onChange={(e) => setditPassword(e.target.value)}
  placeholder='Enter password'
  type="password"
  className="h-[40px] pl-2 pt-1 border-none outline-none mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
></textarea>
    </div>
    
    
    <div className="text-center flex ">
    <button onClick={handleClose} type="submit" className="inline-block w-full mr-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Cancel
      </button>
      <button type="submit" className="inline-block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Update
      </button>
    </div>
  </form>
</div>
</div>
  </div>
    </div>)}  

          </div>
        </div>
      </div>
    </div>
    </div>
   
    </>
  )
}

export default UserTable