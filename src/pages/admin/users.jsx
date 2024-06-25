import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

export const Users = () => {
    const [users , setUsers ] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [changed , setChanged]= useState(0);
    const [showConfirmation , setShowConfirmation] = useState(false);
    const [selectedUser , setSelectedUser ] = useState();
   
     useEffect(()=>{
        const usersInfo = async ()=>{
            let res = await fetch("http://localhost/ecommerce%20project/admin/usersList.php");
            let jsson = await res.json();
            setUsers(jsson)
            setIsLoading(false)
        }
        usersInfo()
    },[changed])
    
    const confirmation=(e)=>{
      setSelectedUser(e);
      setShowConfirmation(true);
      
    }
    const deleteUser=async(email)=>{
      const send = await axios.post("http://localhost/ecommerce%20project/admin/DeleteUser.php" ,{email});
      setChanged(change => change+1);

    }
    return (
        <div className={`pl-64  pt-20 bg-gray-50`}>
    <div className='text-center text-5xl mr-32 mb-12'>USERS</div>
    

    <div className='   mr-20 rounded-lg overflow-hidden bg-gray-50 space-y-4'>
        <div className=' w-full grid grid-cols-6  px-10 h-10 text-xl font-mono text-white bg-green-600 h-12 pt-2 rounded-xl' >
        <div>photo</div>
            <div>Name</div>
            <div >Password</div>
            <div >Email</div>
            <div >joined</div>

            <div className='w-56 -mr-4'>Delete</div>
        </div>
        {isLoading ?
  <div role="status" className=' flex justify-center h-72 items-center '>
    <svg aria-hidden="true"  class="w-20 h-20 text-center text-gray-200 animate-spin dark:text-gray-600 fill-gray-300"  viewBox="0 0 100 101" fill="none"  >
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
:
<div className='space-y-4'>
{users.map((user) => {
  return (
      <div key={user.id} className='grid grid-cols-6 shadow w-full py-4 px-10 rounded-xl bg-white '>
          <div ><img src={`http://localhost/ecommerce%20project/client/${user.photo}`}  className='size-12 rounded-full' alt="" /></div>
          <div className='mt-2'>{user.username}</div>
          <div className='mt-2'>{user.pswd}</div>
          <div className='mt-2'>{user.email}</div>
          <div className='mt-2'>{user.joined}</div>

          <div className=' hover:opacity-70  cursor-pointer  rounded-xl ml-6 mt-2' onClick={()=>confirmation(user.email)}>
            <FaTrashAlt />
            </div>
      </div>
     
  )
})}
</div>


}
    </div>
    {showConfirmation && 
  <div className='fixed inset-0 bg-black opacity-50' style={{backdropFilter: 'blur(5px)'}}></div>
}
    {showConfirmation && 
        <div className='  absolute top-1/3    bg-gray-100 text-center h-44 w-120 rounded-xl shadow-xl p-4 opacity-100 ' style={{left:"40%"}}>
          <div className='text-2xl mt-4'>Do you want to delete this user</div>
          <button className='bg-black text-white px-8 py-2 rounded mt-10 hover:opacity-70' onClick={()=>{deleteUser(selectedUser)
             setShowConfirmation(false)
          }}>confirm</button>
          <div className='w-full h-full relative'><button className='absolute -top-32 text-xl right-0' onClick={()=>setShowConfirmation(false)}><TiDeleteOutline /></button></div>

        </div>
        
      }
</div>
    )
}
export default Users