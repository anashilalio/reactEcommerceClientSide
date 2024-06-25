import axios from 'axios';
import React, { useDebugValue, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../public/textLogo.png'
import cover from '../../public/cover10.png';
export const SignIn = () => {
  const [username , setUsername] = useState(""); 
  const [password , setPasswoord] = useState("");
  const [email , setEmail ] = useState("");
  const [joined , setJoined ] = useState();
  const [Invalidinput , setInvalidInput] = useState(false);
  const navigate = useNavigate();
  const SignIn= async(e)=>{
    
    e.preventDefault();
    if(!(username===""||password ==="")){
      try{
        const response = await axios.post("http://localhost/ecommerce%20project/client/signin.php" , {username , password , email ,joined}) 
        console.log(response.data)
        navigate("/Login")
      }catch(error){
        console.error(error)
      }
      setInvalidInput(false)
    }else{
      setInvalidInput(true)
    }
    setUsername("")
    setPasswoord("")
    
  }
  useEffect(()=>{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    setJoined(`${year}:${month}:${day}`)
  },[])
  return (
    <div className=' h-screen flex  items-center justify-center '>
      <div className='    bg-green-900   h-120  px-12  py-16 border shadow-lg rounded-l-2xl'>
        <img src={cover} className='w-64 h-72' alt="" />
      </div>
      <div>
      <form onSubmit={SignIn}  className='w-auto  bg-white border shadow-lg text-black rounded-r-2xl   h-120  mx-auto  px-16  py-16  flex flex-col items-center space-y-4'>
      <h1 className='font-black text-4xl'><img src={logo} className='w-32 h-12' alt="" /></h1>
      {(Invalidinput) && 
      <div className='bg-red-600 text-white py-2 px-8 '>please entre a valid <br /> username or password</div> }
        <div className='flex justify-between'>
        {/* <label htmlFor="">username</label> */}
        <input type="text" name='username' value={username} onChange={(e)=>setUsername(e.target.value)} 
        placeholder='username' className='h-10 w-60 outline-none px-4 border-b-2 border-black '/>
        </div>
        <div className='flex justify-between'>
        {/* <label htmlFor="">username</label> */}
        <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} 
        placeholder='email' className='h-10 w-60 outline-none px-4 border-b-2 border-black '/>
        </div>
        <div className='flex justify-between'>
        {/* <label htmlFor="">password</label> */}
        <input type="password" name='password' value={password} onChange={(e)=>setPasswoord(e.target.value)}
         placeholder='password'className='h-10 w-60 outline-none px-4 border-b-2 border-black '/>
        </div>
        
        <input type="submit"  className={username==="" || password==="" 
        ?
        "bg-green-500 h-10 w-60 hover:bg-green-400 cursor-not-allowed text-white"
      :'bg-green-500 h-10 w-60 hover:bg-green-400 cursor-pointer text-white'
      }/>
        
      </form>
      </div>
      
    </div>
  )
}
export default SignIn