import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';

export const Users = () => {
    const [users , setUsers ] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
     useEffect(()=>{
        const usersInfo = async ()=>{
            let res = await fetch("http://localhost/ecommerce%20project/admin/Users.php");
            let jsson = await res.json();
            setUsers(jsson)
            setIsLoading(false)
        }
        usersInfo()
    },[])
    return (
        <div className='ml-56  mt-20'>
    <div className='text-center text-5xl mr-32 mb-12'>USERS</div>
    

    <div className='  shadow-xl mr-20'>
        <div className=' w-full grid grid-cols-5  px-10 h-10 text-xl font-mono text-white bg-slate-950 h-12 pt-2' >
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
<div>
{users.map((user) => {
  return (
      <div key={user.id} className='grid grid-cols-5 border-y w-full py-4 px-10 '>
          <div >{user.username}</div>
          <div >{user.pswd}</div>
          <div >{user.email}</div>
          <div >{user.joined}</div>

          <div className='bg-red-600 hover:opacity-70 text-white cursor-pointer  rounded-xl  text-center w-24'>Delete</div>
      </div>
  )
})}
</div>


}
    </div>
    {/* <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">User List</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-white shadow rounded-lg p-4">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-lg font-semibold">John Doe</h2>
          <span class="px-2 py-1 text-xs bg-blue-200 text-blue-800 rounded">Admin</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="font-semibold">Email:</div>
          <div class="text-gray-600">john.doe@example.com</div>
          <div class="font-semibold">Joined:</div>
          <div class="text-gray-600">Jan 1, 2022</div>
        </div>
      </div>

      
    </div>
  </div> */}
</div>
    )
}
export default Users