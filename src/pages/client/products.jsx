import React, { useState, useEffect } from 'react';
import Categorie from './Categorie';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

export const Products = ({type}) => {
  const [products, setProducts] = useState([]);
  const icon = ()=>{
     
    for(let i = 0 ; i<5 ; i++){
      return<Fastar/>
    }
  }
  const { categorie } = useParams();
  const filteredProducts = products.filter(product => product.categorie === categorie);
  useEffect(() => {
    async function fetchProducts() {
      let res = await fetch("http://localhost/ecommerce%20project/client/Product.php");
      let json = await res.json();
      setProducts(json);
      console.log(json)
    }
    console.log(categorie)

    fetchProducts();
  }, []);


  return (
    <div className='mt-16 flex '>
      <Categorie />
      <div className="products ml-96 mt-12 flex flex-wrap gap-12 ">
      {filteredProducts.map((product) => {
        return<>
        <div className='w-56 cursor-pointer  transition-all duration-150 relative'>
          <Link to={`http://localhost:5173/products/categorie/${product.name}`}>
        <img src={`http://localhost/ecommerce%20project/admin/${product.images}`} alt="" className='w-full h-72' />
        </Link>
        <div className={`absolute transition-all 
        duration-50 top-2 right-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white hover:bg-black`}><IoCart /></div>
        <div className={`absolute transition-all 
        duration-50 top-2 left-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white `}><FaHeart /></div>
        <h1 className='text-xl font-extrabold text-center font-mono '>{product.name}</h1>
        <h3 className='text-xl text-center'>{product.categorie}</h3>
        <div className='flex mx-20'>
        {[...Array(5)].map((_, index) => <FaStar key={index} color='orange' />)}
        </div>
        
        
        <h3 className='text-xl text-center'>{product.price} DH</h3>
        </div>
        
        
        </>
      })}
      </div>
      <div>
      
      </div>
    </div>
  );
}

export default Products;