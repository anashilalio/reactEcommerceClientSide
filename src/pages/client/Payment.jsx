import React, { useEffect , useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import logo from '../../../public/logo.png';
import { contextProviderInfo } from '../../context/ContextProvider';
import axios from 'axios';
const stripePromise = loadStripe('pk_test_51PHofh091LehQepwcElJoNqFMly6zSMdyKNlJXF1HLYSK2hZg10wLFVdjqrAPZFzOf5n2a5BWAXlzpy53bdKnAYL00I9kfv4I0');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: {
        number: cardNumberElement,
        exp_month: cardExpiryElement,
        exp_year: cardExpiryElement,
        cvc: cardCvcElement,
      },
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-col'>
      <div className=''>
        <div className='flex flex-col '>
        <label htmlFor="">Email</label>
        <input type="email" className='h-12 p-4 text-md shadow mb-4 outline-none' placeholder='email'/>
        </div>
        
        <div>
        <label htmlFor="">Card Number</label>
        <CardNumberElement className='rounded  h-12 p-4 bg-white shadow mt-2' />
        </div>
        
        <div className='flex justify-between gap-20 my-4'>
          <div>
          <label htmlFor="">Expiration date</label>
        <CardExpiryElement className='rounded  w-72 h-12 p-4 bg-white shadow mt-2' />
          </div>
        
        <div>
        <label htmlFor="">Security Code</label>
        <CardCvcElement className=' rounded w-72 h-12 p-4 bg-white shadow mt-2' />
        </div>
       
        </div>
        
      </div>
      
    </form>
  );
};

const Payment = () => {
  const { listItems , setListItems , clientdata} = useContext(contextProviderInfo);
  const [listofProducts , setlistofProducts ] = useState([]);
  
  useEffect(() => {
    const productIds = listItems.map(item => parseInt(item.productid));
    setlistofProducts(productIds);
  }, [listItems]);

  
  const payed=async()=>{
    const clientid = clientdata.clientid
    const send = axios.post("http://localhost/ecommerce%20project/client/payed.php" , {listItems : listofProducts , clientid :clientid})
    console.log(send)
  }
  return (
    <div className='mt-20  rounded-2xl shadow-xl px-12 py-4 bg-slate-50 mx-72 flex flex-col items-center'>
      <img src={logo} alt="" className='size-32'/>
      <Elements stripe={stripePromise} >
        <CheckoutForm />
      </Elements>
      <div className=''>
      <button type="submit" onClick={()=>payed()} className='bg-black rounded text-white mx-auto px-16 py-2 mt-4 text-xl'>
        Pay
        
      </button>
      </div>
    </div>
  );
};

export default Payment;