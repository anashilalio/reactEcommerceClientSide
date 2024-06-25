import React, { useState } from 'react'
import axios from 'axios';
export const ContactUs = () => {
  const [email , setEmail ] = useState("");
  const [subject , setSubject ] = useState("");
  const [message, setMessage ] = useState("");
  const [firstName, setFirstName ] = useState("");
  const [lastName, setLastName] = useState("");

  const inputStyle = ()=> {
    return ('outline-none w-130 h-12 space-x-8 px-4 text-black border-b-2')
  }
  const sendEmail=async (e)=>{
    e.preventDefault();
    const response = await axios.post("http://localhost/ecommerce%20project/client/send.php" , {email , subject , message});
    console.log(response.data)
  }
  return (
    <div className=' '>
      <div className='text-black mt-20 text-center text-5xl font-mono font-bold'>Contact Us</div>
      <form onClick={sendEmail} className='flex flex-col justify-center items-center h-screen space-y-10 -mt-16 '>
        <div className="w-130 h-12 space-x-8 text-black" >
        <input type="firstName" value={firstName} name='firstName' placeholder='FirstName' className='outline-none w-56 h-full px-4 border-b-2'  onChange={e=>setFirstName(e.target.value)}/>
        <input type="lastName" value={lastName} name='LastName' placeholder='LastName' className='outline-none w-56 h-full px-4 border-b-2' onChange={e=>setLastName(e.target.value)}/>

        </div>
      <input type="  " value={email} name='email' placeholder='email' className={inputStyle()} onChange={e=>setEmail(e.target.value)}/>
      <textarea type="message" value={message} name='message' placeholder='message' className={`${inputStyle()} h-20`} onChange={e=>setMessage(e.target.value)}/>
      <input type="submit"  className='bg-green-500 w-130 text-white h-12 rounded-xl hover:opacity-80 cursor-pointer'/>
      </form>
      
    </div>
  )
}
export default ContactUs