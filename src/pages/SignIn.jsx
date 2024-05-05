import axios from 'axios';
import React, { useDebugValue, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../public/logo.png'

export const SignIn = () => {
  const [username , setUsername] = useState(""); 
  const [password , setPasswoord] = useState("");
  const [email , setEmail ] = useState("");
  const [Invalidinput , setInvalidInput] = useState(false);
  const navigate = useNavigate();
  const SignIn= async(e)=>{
    e.preventDefault();
    if(!(username===""||password ==="")){
      try{
        const response = await axios.post("http://localhost/ecommerce%20project/client/signin.php" , {username , password , email}) 
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
  return (
    <div className=' h-screen flex  items-center '>

      
      <form onSubmit={SignIn} className='w-auto  shadow-2xl   mx-auto  px-40  py-16 rounded-xl flex flex-col items-center space-y-4'>
      <img src={logo} alt="" className='size-32'/>
      {Invalidinput && 
      <div className='bg-red-600  py-2 px-8 '>please entre a valid <br /> username or password</div> }
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
        "bg-blue-500 h-10 w-60 hover:bg-blue-400 cursor-not-allowed text-white"
      :'bg-blue-500 h-10 w-60 hover:bg-blue-400 cursor-pointer text-white'
      }/>      </form>
    </div>
  )
}
export default SignIn