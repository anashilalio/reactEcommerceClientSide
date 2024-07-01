import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import { IoCart } from 'react-icons/io5';

const Search = ({ search }) => {
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost/ecommerce%20project/client/Product.php");
        const json = await res.json();
        setProducts(json);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

 
  return (
    <div className='mt-4 flex flex-wrap gap-12 text-center'>
      {results.map((product) => (
        <div key={product.productid} className='w-56 relative'>
          <Link to={`/products/categorie/${product.name}/${product.productid}`}>
            <img src={`http://localhost/ecommerce%20project/admin/${product.images}`} alt={product.name} className='w-full h-72 rounded-xl' />
          </Link>
          <div className={`absolute transition-all duration-50 top-2 right-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white hover:bg-black`}>
            <IoCart />
          </div>
          <div className={`absolute transition-all duration-50 top-2 left-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white`}>
            <FaHeart />
          </div>
          <h1 className='text-xl font-extrabold text-center font-mono'>{product.name}</h1>
          <h3 className='text-xl text-center'>{product.categorie}</h3>
          <div className='flex justify-center'>
            {[...Array(5)].map((_, index) => <FaStar key={index} color='orange' />)}
          </div>
          <h3 className='text-xl text-center'>{product.price} DH</h3>
        </div>
      ))}
    </div>
  );
};

export default Search;
