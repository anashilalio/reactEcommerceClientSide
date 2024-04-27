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
    <div>
        {users.map((user)=>{
            return<>
                <div>
                    {user.username}
                    {user.pswd}
                    {user.clientid}

                </div>
            </>
        })}

    </div>
  )
}
export default Users