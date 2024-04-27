import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { contextProviderInfo } from '../context/ContextProvider';

const Login = () => {
    const [username , setUsername] = useState(""); 
    const [password , setPasswoord] = useState("");
    const {userExist , userData , setUserData , SetUserExist} = useContext(contextProviderInfo)
  const [Invalidinput , setInvalidInput] = useState(false);
  const navigate = useNavigate(); // Get the navigate object

  
  const SignIn = async(e) => {
    e.preventDefault();
    if(!(username === "" || password === "")){
      try{
        const response = await axios.post("http://localhost/ecommerce%20project/client/login.php",
         {
          
            username: username,
            password: password
          
        });
        if(response.data==="user doesn't exist"){
            console.log("error")
            SetUserExist(false)
        }else{
            setUserData(response.data)
            SetUserExist(true)
            navigate("/")
        }
      } catch(error) {
        console.error(error);
      }
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
      setUsername("");
      setPasswoord("");
    }
    
  }
  return (
    <>
    <div className='bg-blue-500 h-screen flex  items-center '>

      
      <form onSubmit={SignIn}  className='w-auto  bg-white shadow-black shadow-sm mx-auto  px-40  py-16 rounded-xl flex flex-col items-center space-y-4'>
      <h1 className='font-black text-4xl'>Login</h1>
      {(Invalidinput || !userExist) && 
      <div className='bg-red-600 text-white py-2 px-8 '>please entre a valid <br /> username or password</div> }
        <div className='flex justify-between'>
        {/* <label htmlFor="">username</label> */}
        <input type="text" name='username' value={username} onChange={(e)=>setUsername(e.target.value)} 
        placeholder='username' className='h-10 w-60 outline-none px-4 border-b-2 border-black '/>
        </div>
        <div className='flex justify-between'>
        {/* <label htmlFor="">password</label> */}
        <input type="password" name='password' value={password} onChange={(e)=>setPasswoord(e.target.value)}
         placeholder='password'className='h-10 w-60 outline-none px-4 border-b-2 border-black '/>
        </div>
        
        <input type="submit"  className='bg-blue-500 h-10 w-60 hover:bg-blue-400 cursor-pointer text-white'/>
        {userExist &&
            <div>
                {userData.username}
            </div>
        }
      </form>
    
    </div>
    </>
        
  )
}

export default Login