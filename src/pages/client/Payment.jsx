import React, { useEffect, useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { contextProviderInfo } from '../../context/ContextProvider';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

const stripePromise = loadStripe('pk_test_51PHofh091LehQepwcElJoNqFMly6zSMdyKNlJXF1HLYSK2hZg10wLFVdjqrAPZFzOf5n2a5BWAXlzpy53bdKnAYL00I9kfv4I0');

const PaymentForm = () => {
  const { listItems, clientdata } = useContext(contextProviderInfo);
  const [isPayed, setIsPayed] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (!error) {
      const clientid = clientdata;
      const dat = new Date();
      const datt = `${dat.getFullYear()}-${dat.getMonth() + 1}-${dat.getDate()}`;
      const listofProducts = listItems.map(item => parseInt(item.productid));

      try {
        await axios.post("http://localhost/ecommerce%20project/client/payed.php", {
          listItems: listofProducts,
          clientid: clientid,
          datt: datt,
          paymentMethodId: paymentMethod.id,
        });
        setIsPayed(true);
      } catch (error) {
        console.error('Payment error:', error);
      }
    } else {
      console.error('Stripe error:', error);
    }
  };

  const total = listItems.reduce((acc, item) => acc + Number(item.price), 0);
  const NumberOfProduct = listItems.length;

  return (
    <div className='mt-20 flex flex-col lg:flex-row justify-around items-start'>
      {isPayed ? (
        <div className='w-full lg:w-2/3 px-4'>
          <div className='bg-white p-8 rounded-lg shadow-md'>
            <div className='text-3xl font-semibold text-center mb-4'>Payment Successful!</div>
            <FaCheckCircle className='text-green-400 text-5xl mx-auto' />
            <div className='mt-8'>
              <div className='text-xl font-semibold'>Receipt</div>
              <div className='mt-4'>
                {listItems.map((item) => (
                  <div key={item.productid} className='flex justify-between'>
                    <div>{item.name}</div>
                    <div className='font-semibold'>{item.price} DH</div>
                  </div>
                ))}
                <div className='flex justify-between font-semibold mt-4'>
                  <div>Number of Products</div>
                  <div>{NumberOfProduct}</div>
                </div>
                <div className='text-2xl font-bold mt-4 text-right'>{total} DH</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full lg:w-2/3 px-4'>
          <div className='flex flex-wrap gap-4'>
            {listItems.map((item) => (
              <div key={item.productid} className='text-center bg-white rounded-xl shadow w-32 overflow-hidden'>
                <img src={`http://localhost/ecommerce%20project/admin/${item.images}`} className='h-32 w-full object-cover' alt={item.name} />
                <div className='font-semibold'>{item.name}</div>
                <div className='text-gray-500'>{item.price} DH</div>
              </div>
            ))}
          </div>
          <form onSubmit={handlePayment} className='space-y-4 mt-8 bg-white p-8 rounded-lg shadow-md'>
            <div className='flex gap-4'>
              <div className='flex flex-col w-full'>
                <label htmlFor="firstName" className='font-semibold'>Nom</label>
                <input type="text" id="firstName" className='w-full h-12 shadow-lg rounded-lg outline-none px-4' required />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor="lastName" className='font-semibold'>Prénom</label>
                <input type="text" id="lastName" className='w-full h-12 shadow-lg rounded-lg outline-none px-4' required />
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='flex flex-col w-full'>
                <label htmlFor="phoneNumber" className='font-semibold'>Nombre de téléphone</label>
                <input type="text" id="phoneNumber" className='w-full h-12 shadow-lg rounded-lg outline-none px-4' required />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor="email" className='font-semibold'>l'Email</label>
                <input type="email" id="email" className='w-full h-12 shadow-lg rounded-lg outline-none px-4' required />
              </div>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="cardNumber" className='font-semibold'>Nombre de cart</label>
              <CardNumberElement id="cardNumber" className='w-full h-12 shadow-lg rounded-lg px-4 outline-none' options={{ style: { base: { fontSize: '18px', padding: '10px' } } }} />
            </div>
            <div className='flex gap-4'>
              <div className='flex flex-col w-full'>
                <label htmlFor="cardExpiry" className='font-semibold'>Date d'expiration</label>
                <CardExpiryElement id="cardExpiry" className='w-full h-12 shadow-lg px-4 outline-none rounded-lg' options={{ style: { base: { fontSize: '18px', padding: '10px' } } }} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor="cardCvc" className='font-semibold'>CVC</label>
                <CardCvcElement id="cardCvc" className='w-full h-12 shadow-lg px-4 rounded-lg outline-none' options={{ style: { base: { fontSize: '18px', padding: '10px' } } }} />
              </div>
            </div>
            <button type="submit" className='bg-green-500 rounded text-white w-full py-2 mt-4 text-xl hover:bg-green-600'>
              Payer {total} DH
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment;
