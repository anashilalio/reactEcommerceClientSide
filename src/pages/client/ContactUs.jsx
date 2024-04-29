import React, { useState } from 'react'
import axios from 'axios';
export const ContactUs = () => {
  const [email , setEmail ] = useState("");
  const [subject , setSubject ] = useState("");
  const [message, setMessage ] = useState("");

  const sendEmail=async (e)=>{
    e.preventDefault();
    const response = await axios.post("http://localhost/ecommerce%20project/client/send.php" , {email , subject , message});
    console.log(response.data)
  }
  return (
    <div>
      <form onClick={sendEmail}>
      <input type="email" value={email} name='email' onChange={e=>setEmail(e.target.value)}/>
      <input type="subject" value={subject} name='subject' onChange={e=>setSubject(e.target.value)}/>
      <input type="message" value={message} name='message' onChange={e=>setMessage(e.target.value)}/>
      <input type="submit" />
      </form>
      
    </div>
  )
}
export default ContactUs