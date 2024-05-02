import React, { useState } from 'react'
import axios from 'axios';
export const ContactUs = () => {
  const [email , setEmail ] = useState("");
  const [subject , setSubject ] = useState("");
  const [message, setMessage ] = useState("");
  const [firstName, setFirstName ] = useState("");
  const [lastName, setLastName] = useState("");

  const inputStyle = ()=> {
    return ('outline-none w-130 h-12')
  }
  const sendEmail=async (e)=>{
    e.preventDefault();
    const response = await axios.post("http://localhost/ecommerce%20project/client/send.php" , {email , subject , message});
    console.log(response.data)
  }
  return (
    <div className=' '>
      <form onClick={sendEmail} className='flex flex-col justify-center items-center h-screen space-y-10'>
        <div className={inputStyle()}>
        <input type="firstName" value={firstName} name='firstName' placeholder='FirstName' className='outline-none w-60'  onChange={e=>setFirstName(e.target.value)}/>
        <input type="lastName" value={lastName} name='LastName' placeholder='LastName' className='outline-none w-60' onChange={e=>setLastName(e.target.value)}/>

        </div>
      <input type="email" value={email} name='email' placeholder='email' className={inputStyle()} onChange={e=>setEmail(e.target.value)}/>
      <input type="message" value={message} name='message' placeholder='message' className={inputStyle()} onChange={e=>setMessage(e.target.value)}/>
      <input type="submit"  className='bg-blue-400 w-130 h-12 rounded-xl hover:bg-blue-300 cursor-pointer'/>
      </form>
      
    </div>
  )
}
export default ContactUs