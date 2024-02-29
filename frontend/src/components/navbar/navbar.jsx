import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLogoutMutation } from "../../slices/userApiSlice"
import {logout} from '../../slices/authSlice'
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { increment,decrement } from "../../slices/counterSlice"

function Navbar(){
    const [dropdown,setDropdown]=useState(false)
    const {userInfo} = useSelector((state)=>state.auth)
    const {count}=useSelector((state)=>state.counter)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
     const location = useLocation()
     const isHome= location.pathname=='/'
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
  const array=[1,2,34,]
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!searchTerm.trim()) {
        // setError('Please enter a search term');
        return;
      }
  
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSearchResults(data);
        setError(null);
      } catch (error) {
        // console.error('Error fetching data:', error);
        // setError('Failed to fetch data. Please try again later.');
      }
    };
  

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()
    const logoutHandler =async ()=>{
      try {
        await logoutApiCall().unwrap()
        dispatch(logout())
        navigate('/')
      } catch (err) {
        
      }
    }

    return(
        <>
        <nav className="bg-gray-800">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
        
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
         
          <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        {/* <div className="flex flex-shrink-0 items-center">
          <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
        </div> */}
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">USER MANAGEMENT</a>
            {/* <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a> */}
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View notifications</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            {/* <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /> */}
          </svg>
        </button>
       {userInfo ? (<div className="relative ml-3">
          <div onClick={()=>setDropdown(!dropdown)}>
            <button type="button" className="relative flex  bg-gray-800 text-sm focus:outline-none  text-white  focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="sr-only">Open user menu</span>
            <b> {userInfo.name}</b>
            </button>
          </div>

        {
            dropdown ? ( <div onClick={()=>setDropdown(!dropdown)} className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0"><Link to='/profile'> Profile</Link></a>
            <a onClick={logoutHandler} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Log out</a>
          </div>) : ''
        }
         
        </div>) : (<button  type="button" className="relative flex  bg-gray-800 text-sm focus:outline-none  text-white  focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="sr-only">Open user menu</span>
            <Link to='/login'>Login </Link>
            </button>)}
        
      </div>
    </div>
  </div>

  <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pb-3 pt-2">
      <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
    </div>
  </div>
</nav>
{isHome && (<div>
<form onSubmit={handleSubmit} className="flex items-center mt-3 justify-center">
  <textarea
    value={searchTerm}
    onChange={handleChange}
    className="w-64 h-12 px-4 py-2 text-lg border rounded-md mr-2 focus:outline-none focus:border-blue-500"
    placeholder="Enter a word..."
  ></textarea>
  <button
    type="submit"
    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
  >
    Search
  </button>




   <button onClick={()=>{
    dispatch(increment())
   }} >increment</button>
   <span>{count}</span>
   <button onClick={()=>{
    dispatch(decrement())
   }}
   >decrecrement</button>


</form>
      {error && <p>{error}</p>}
      {searchResults.length > 0 && (
       <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
       <h2 className="text-2xl font-bold mb-4">Word: {searchResults[0].word}</h2>
       <p className="text-lg">Phonetic: {searchResults[0].phonetic}</p>
       <ul className="mt-4">
         {searchResults[0].meanings.map((meaning, index) => (
           <li key={index} className="mb-4">
             <h3 className="text-lg font-semibold">Part of Speech: {meaning.partOfSpeech}</h3>
             <p className="text-base mt-1">Definition: {meaning.definitions[0].definition}</p>
             <p className="text-base mt-1">Example: {meaning.definitions[0].example}</p>
           </li>
         ))}
       </ul>
     </div>
     
      )}
    </div>)}


        </>
    )
}
export default Navbar