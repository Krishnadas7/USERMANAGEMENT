import React,{useState,useEffect} from 'react'
import { useGetUserDataMutation,useDeleteUserMutation } from '../../slices/adminApiSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import Modal from "react-modal";

import './adminDashboard.css'
import image from '../../assets/avatar.jpg'

Modal.setAppElement("#root");

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const UserTable = () => {    const [users,setUsers] = useState([])
    const [search, setSearch] = useState("");
    const [data,setData] = useState(true)
    const [userId, setUserId] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [getUserData] = useGetUserDataMutation()
    const [deleteUser] = useDeleteUserMutation()
    const {userInfo} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        async function fetchUser(){
            const res= await getUserData().unwrap()
            setUsers(res.user)
        }
        fetchUser()
    },[data,getUserData])

    useEffect(() => {
        // Function to filter users based on search criteria
        const filterUsers = () => {
          const filtered = users.filter((user) => {
            const userName = user.name.toLowerCase();
            const userEmail = user.email.toLowerCase();
            const searchValue = search.toLowerCase();
            return (
              userName.includes(searchValue) || userEmail.includes(searchValue)
            );
          });
          setFilteredUsers(filtered);
        };
    
        // Call the filter function whenever users or search value changes
        filterUsers();
      }, [users, search]);
      const handleDeleteClick = (userId) => {
        setUserId(userId);
        setIsOpen(true);
      };
    
      const closeModal = () => {
        setIsOpen(false);
      };
      const handleDelete = async () => {
        if (userId) {
          await deleteUser(userId).unwrap("");
          setData((prevData) => !prevData);
          setUserId(null);
          setIsOpen(false);
          if (userInfo && userInfo._id === userId) {
            dispatch(logOut());
          }
        }
      };
  return (
    <>
    <div className='mx-[200px] m-2'>
     <div className="flex flex-col" >
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 m-5" >
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
          <table className="min-w-full text-center text-sm font-light">
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
          <img className="w-20 h-20 rounded-full mr-2" src={image} alt="" /> 
          <span className='ml-10'>{obj.name}</span> 
        </div>
      </td>
      <td className="whitespace-nowrap px-6 ">{obj.email}</td>
      <td className="whitespace-nowrap px-6 ">
        <button className="user-btn">Block</button>
      </td>
      <td className="whitespace-nowrap px-6 ">
        <button onClick={() => handleDeleteClick(obj._id)} className="user-btn">Delete</button>
      </td>
    </tr>
        ))
    }
   
   
  </tbody>
</table>
<Modal
        isOpen={modalIsOpen}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete User Modal"
      >
        <p className="font-bold text-xl mt-5 text-blue-600">
          Are you sure you want to delete this user?
        </p>
        <div className="flex justify-around mt-10">
          <button
            onClick={closeModal}
            className="h-10 w-20 hover:bg-green-700 bg-black rounded-lg text-white hover:scale-105"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className="h-10 w-20 hover:bg-red-700 bg-black rounded-lg text-white hover:scale-105"
          >
            Proceed
          </button>
        </div>
      </Modal>

          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default UserTable