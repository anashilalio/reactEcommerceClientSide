import React, { useEffect, useState ,useContext } from 'react'
import { contextProviderInfo } from '../../context/ContextProvider';
import { IoIosRemoveCircle } from "react-icons/io";

const Cart = () => {
  const [items , setItems ] = useState([]);
  const {clientdata } = useContext(contextProviderInfo);
  const [listItems , setListItems ] = useState([]);
  useEffect(() => {
    const getCartItems = async () => {
      const response = await fetch("http://localhost/ecommerce%20project/client/getCartItems.php");
      const carttt = await response.json();
  
      const promises = carttt.map(async (i) => {
        if (clientdata.clientid === i.clientid) {
          const response = await fetch("http://localhost/ecommerce%20project/client/Product.php");
          const res = await response.json();
          return res.find(product => product.productid === i.productid);
        }
      });
  
      const listItems = await Promise.all(promises);
      setListItems(listItems.filter(item => item)); // filter out any undefined items
      setItems(carttt);
    }
    console.log(listItems)
    getCartItems();
  }, []);
  
  return (
    <div className='mt-20'>
      {listItems.map((er)=>{
        return <div className='w-3/4 grid grid-cols-5  h-44 ml-8 shadow pt-5'>
          {console.log(listItems)}
          <div><img src={`http://localhost/ecommerce%20project/admin/${er.images}`} className='h-32' alt="" /></div>
          <div className='mt-12'> {er.name}</div>
          <div className='mt-12'> {er.categorie}</div>
          <div className='mt-12'> {er.price}</div>

          <div className='mt-12 relative' ><IoIosRemoveCircle className='text-red-500 text-3xl cursor-pointer'/> 

          </div>
          <div></div>
        </div>
      })}
    </div>
  )
}

export default Cart