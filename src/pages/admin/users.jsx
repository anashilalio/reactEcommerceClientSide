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
    <div className='ml-72'>
        <div>USERS</div>
        <div className='border w-3/4'>

            <tr className='border w-full flex justify-between px-10 h-10  '>
                <td className='w-44'>name</td>
                <td className='w-44'>Password</td>
                <td className='w-44'>email</td>

                <td className='w-44 -mr-4'>supprimer</td>

            </tr>
        {users.map((user)=>{
            return<>
            
                <tr className='flex gap-16 border w-full py-4 justify-between px-10 '>
                    <td className='w-44'>{user.username}</td>
                    <td className='w-44'>{user.pswd}</td>
                    <td className='w-44'>{user.email}</td>

                    <td className='bg-red-600 text-white cursor-pointer px-4 mr-4 rounded-xl '>supprimer</td>
                </tr>
            </>
        })}

        </div>
        

    </div>
  )
}
export default Users