import React, { useEffect , useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import logo from '../../../public/logo.png';
import { contextProviderInfo } from '../../context/ContextProvider';
import axios from 'axios';
import { FaCheckCircle } from "react-icons/fa";

const stripePromise = loadStripe('pk_test_51PHofh091LehQepwcElJoNqFMly6zSMdyKNlJXF1HLYSK2hZg10wLFVdjqrAPZFzOf5n2a5BWAXlzpy53bdKnAYL00I9kfv4I0');



const Payment = () => {
  const { listItems , setListItems , clientdata} = useContext(contextProviderInfo);
  const [listofProducts , setlistofProducts ] = useState([]);
  const [isPayed , setIsPayed ] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    const productIds = listItems.map(item => parseInt(item.productid));
    setlistofProducts(productIds);
  }, [listItems]);

  console.log(clientdata)
  const payed=async()=>{
    const clientid = clientdata;
    const dat = new Date();
    const getMonth = dat.getMonth();
    const getYear = dat.getFullYear();
    const getDay = dat.getDate();
    const datt = `${getYear}-${getMonth+1}-${getDay}`;
    const send = axios.post("http://localhost/ecommerce%20project/client/payed.php" , {listItems : listofProducts , clientid :clientid , datt :datt})
    console.log(send)
  }
  const total = listItems.reduce((acc, item) => acc + Number(item.price) , 0);
  const NumberOfProduct = listItems.length;
  console.log(total)
 const check = ()=>{

 }
  return (
    <div className='relative mt-20 flex'>
      
      
<div className=' rounded-2xl shadow-xl px-12 py-4 bg-slate-50  flex flex-col items-center w-full'>
<div className='flex gap-12 font-bold'>
      {listItems.map((e)=>{
        return <div className='text-center bg-white  rounded-xl shadow w-32 overflow-hidden'>
          <div><img src={`http://localhost/ecommerce%20project/admin/${e.images}`} className='h-32 w-full' alt="" /></div>
          {e.name}
          <div >{e.price}DH</div>
        </div>
      })}
      </div>
      <div className='space-y-4'>
        <div className='flex gap-4'>
      <div className='flex flex-col'>
          <label htmlFor="" >First Name</label>
        
        <input type="text" className='w-96 h-12 shadow-lg  rounded-lg outline-none px-4'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="" >last Name</label>
        
        <input type="text" className='w-96 h-12 shadow-lg  rounded-lg outline-none px-4'/>
        </div>

        </div>
        <div className='flex gap-4'>
      <div className='flex flex-col'>
          <label htmlFor="" >Phone Number</label>
        
        <input type="Number" className='w-96 h-12 shadow-lg  rounded-lg outline-none px-4'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="" >Email</label>
        
        <input type="text" className='w-96 h-12 shadow-lg  rounded-lg outline-none px-4'/>
        </div>

        </div>
        <div className='flex flex-col'>
          <label htmlFor="" >card Number</label>
        
        <input type="Number" className='w-full h-12 shadow-lg  rounded-lg outline-none px-4'/>
        </div>
        <div className='flex gap-4'>

        <div className='flex flex-col'>
        <label htmlFor="" >Expiration date</label>
                <input type="Number" className='w-96 h-12 shadow-lg px-4 outline-none rounded-lg '/>
        </div>
        <div className='flex flex-col'>
        <label htmlFor="" >Code</label>
        <input type="Number" className='w-96 h-12 shadow-lg px-4  rounded-lg outline-none'/>
        </div>
        </div>

      </div>
      <div className=''>
      <button type="submit" onClick={()=>payed()} className='bg-green-500 rounded text-white mx-auto px-16 py-2 mt-4 text-xl '>
        Pay
        
      </button>
      </div>
      <div>
     
      </div>
      
    </div>
    {
      showSuccess &&
    <div className='absolute right-12 top-0 w-54 shadow-xl h-24 py-8 px-4 flex items-center gap-4'>
    <FaCheckCircle className='text-green-400'/>
     successfull Paiment

    </div>
    }
    <div className='w-96 '>
      <div>
        {listItems.map((e)=>{
          return <div className='w-96 h-16 flex justify-between px-12 items-center gap-4'>
            <div>{e.name}</div>
            <div className='text-xl font-semibold'>{e.price}DH</div>
          </div>
        })}
        <div className='flex justify-between px-12'>
        Number of Products  :  
        <div className='font-semibold'>{NumberOfProduct}</div>
        </div>
        
        <div className='text-3xl text-center mt-32 font-bold'>
        {total} DH

        </div>
     

      </div>
    </div>
    </div>
    
  );
};

export default Payment;