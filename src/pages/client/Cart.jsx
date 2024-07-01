import React, { useEffect, useState, useContext } from 'react';
import { contextProviderInfo } from '../../context/ContextProvider';
import { IoIosRemoveCircle } from 'react-icons/io';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([]);
  const { clientdata, listItems, setListItems } = useContext(contextProviderInfo);
  const [deleteThatProduct, setDeleteThatProduct] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartResponse = await fetch("http://localhost/ecommerce%20project/client/getCartItems.php");
        const cartItems = await cartResponse.json();

        const productResponses = await Promise.all(
          cartItems.map(async (item) => {
            if (clientdata === item.clientid) {
              const productResponse = await fetch("http://localhost/ecommerce%20project/client/Product.php");
              const products = await productResponse.json();
              return products.find(product => product.productid === item.productid);
            }
          })
        );

        const filteredItems = productResponses.filter(item => item);
        setListItems(filteredItems);
        setItems(cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [clientdata, deleteThatProduct, setListItems]);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.post("http://localhost/ecommerce%20project/client/deleteProductFromCart.php", { deleteThatProduct: productId });
      setDeleteThatProduct(prev => prev + 1);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    const calculateTotalOrder = () => {
      const total = listItems.reduce((sum, item) => sum + Number(item.price), 0);
      setTotalOrder(total);
    };

    calculateTotalOrder();
  }, [listItems]);

  return (
    <div className='mt-20 flex flex-col lg:flex-row justify-around items-start'>
      <div className='w-full lg:w-2/3 px-4'>
        {listItems.map((item) => (
          <div key={item.productid} className='flex flex-col lg:flex-row items-center justify-between p-4 mb-4 bg-white shadow rounded-lg'>
            <img src={`http://localhost/ecommerce%20project/admin/${item.images}`} className='w-full lg:w-1/5 object-cover h-32 rounded-lg' alt={item.name} />
            <div className='flex flex-col lg:flex-row lg:items-center lg:space-x-8 mt-4 lg:mt-0 w-full lg:w-auto'>
              <div className='text-xl font-semibold'>{item.name}</div>
              <div className='text-gray-500'>{item.categorie}</div>
              <div className='text-green-700 text-2xl font-bold'>{item.price} DH</div>
            </div>
            <button onClick={() => handleDeleteProduct(item.productid)} className='mt-4 lg:mt-0'>
              <IoIosRemoveCircle className='text-red-500 text-3xl cursor-pointer hover:text-red-700' />
            </button>
          </div>
        ))}
      </div>
      <div className='w-full lg:w-1/3 p-8 bg-white shadow rounded-lg text-center mt-8 lg:mt-0'>
        <div className='text-2xl font-semibold'>Your Total Order</div>
        <div className='text-4xl mt-4 text-green-700 font-bold'>{totalOrder} DH</div>
        <Link to="/Payment">
          <div className='bg-green-700 text-white rounded-2xl w-56 mx-auto mt-8 shadow-lg cursor-pointer hover:bg-green-600 h-10 pt-2 text-xl'>
          aller au paiement
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
