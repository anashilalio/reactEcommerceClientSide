import React, { useEffect, useState ,useContext } from 'react'
import { contextProviderInfo } from '../../context/ContextProvider';
import { IoIosRemoveCircle } from "react-icons/io";
import axios from 'axios';
import { Link } from 'react-router-dom';
const Cart = () => {
  const [items , setItems ] = useState([]);
  const {clientdata , listItems , setListItems} = useContext(contextProviderInfo);
  const [deleteThatProduct , setDeleteThatProduct ] = useState(0);
  const [totalOrder , setTotalOrder ]   = useState(0); 

  useEffect(() => {
    const getCartItems = async () => {
      const response = await fetch("http://localhost/ecommerce%20project/client/getCartItems.php");
      const carttt = await response.json();
      const promises = carttt.map(async (i) => {
        if (clientdata === i.clientid) {
          const response = await fetch("http://localhost/ecommerce%20project/client/Product.php");
          const res = await response.json();
          return res.find(product => product.productid === i.productid);
        }
      });
  
      const listItems = await Promise.all(promises);
      setListItems(listItems.filter(item => item)); // filter out any undefined items
      setItems(carttt);
    }
    getCartItems();
  }, [deleteThatProduct]);
  
    const deleteProduct = async(pro)=>{
      const response = await axios.post("http://localhost/ecommerce%20project/client/deleteProductFromCart.php",{deleteThatProduct : pro });      
      setDeleteThatProduct(deleteThatProduct+1);
    }
   
    
  
  useEffect(() => {
    let total = 0;
    listItems.forEach(item => {
      total += Number(item.price);
    });
    setTotalOrder(total);
  }, [listItems]);
  return (
    <div className='mt-20 flex justify-around'>
      <div className=' '>
      {listItems.map((er)=>{
        
        return <div className='w-full grid grid-cols-5  h-44 ml-8 shadow pt-5'>
          <div><img src={`http://localhost/ecommerce%20project/admin/${er.images}`}  className='h-32' alt="" /></div>
          <div className='mt-12'> {er.name}</div>
          <div className='mt-12'> {er.categorie}</div>
          <div className='mt-12'> {er.price}</div>
          <div className='mt-12 relative' onClick={()=>deleteProduct(er.productid)} ><IoIosRemoveCircle className='text-red-500 text-3xl cursor-pointer'/> 
          {()=>setTotalOrder(e=>e+er.price)} 
          </div>
          <div>
          </div>
        </div>
      })}
      </div>
      <div className='w-96 overflow-hidden text-center mt-24'>
      <div className='text-3xl'>your total Order</div>
      <div className='text-4xl mt-8'>{totalOrder}$</div>
      <Link to="/Payment"><div className='bg-blue-900 text-white rounded-2xl w-56 mx-auto mt-8 shadow-lg cursor-pointer
      hover:opacity-80 h-10 pt-1 text-xl'>go to payment</div></Link>

      </div>
    </div>
  )
}

export default Cart