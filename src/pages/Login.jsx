import axios from 'axios';
import React, { useState } from 'react'

export const Login = () => {
  const [username , setUsername] = useState(""); 
  const [password , setPasswoord] = useState("");
  const login= async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost/ecommerce%20project/client/login.php" , {username , password}) 
      console.log(response.data)

    }catch(error){
      console.error(error)
    }
  }
  return (
    <div>
      <form onSubmit={login}>
        <label htmlFor="">username</label>
        <input type="text" name='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <label htmlFor="">password</label>
        <input type="password" name='password' value={password} onChange={(e)=>setPasswoord(e.target.value)}/>
        <input type="submit" />
      </form>
    </div>
  )
}
export default Login