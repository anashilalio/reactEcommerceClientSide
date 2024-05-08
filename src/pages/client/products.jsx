import React, { useState, useEffect } from 'react';
import Categorie from './Categorie';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

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
        <div className='w-56 cursor-pointer hover:scale-105 transition-all duration-150'>
          <Link to={`http://localhost:5173/products/categorie/${product.name}`}>
        <img src={`http://localhost/ecommerce%20project/admin/${product.images}`} alt="" className='w-full h-72' />
        </Link>
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