import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';

export const Users = () => {
    const [users , setUsers ] = useState([]);
     useEffect(()=>{
        const usersInfo = async ()=>{
            let res = await fetch("http://localhost/ecommerce%20project/admin/Users.php");
            let jsson = await res.json();
            setUsers(jsson)
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