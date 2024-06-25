import React, { useState, useEffect , useContext } from 'react';
import Categorie from './Categorie';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import ContextProviderClient, { contextProviderInfo } from '../../context/ContextProvider';
import AllProducts from './AllProducts';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import Search from './Search';

export const Products = ({type}) => {
  const [products, setProducts] = useState([]);
  const [searched , SetSearched ] = useState(false);
  const {clientdata } = useContext(contextProviderInfo);
  const [srh , setSrh ] = useState("");
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

  const addToCart = async (e)=>{
    const clientid = parseInt(clientdata);
  
    const response = await axios.post("http://localhost/ecommerce%20project/client/cart.php" ,{clientid ,productid: e} ) ;
    console.log(response)
}
const addToWishlist = async (e)=>{
  const clientid = parseInt(clientdata);
console.log(clientid)
  const response = await axios.post("http://localhost/ecommerce%20project/client/wishlist.php" ,{clientid ,productid: e} ) ;
  console.log(response)
}
console.log(clientdata)
  return (
    <div className="bg-gray-50 h-full"> 
      <div className='relative w-2/4 ml-96 mt-16 '>
        <input type="text"  value={srh}  onChange={e => setSrh(e.target.value)} className='w-full h-12 outline-none rounded-full border px-6 shadow' />


    <FaSearch className='absolute top-2 right-6   cursor-pointer text-3xl ' onClick={()=>SetSearched(true)}/>
    
        </div>
    <div className='flex '>
      

      
       
      <Categorie />
      <div className="products ml-96 mt-12 flex flex-wrap gap-12 ">
     {searched ?
     <div>
      <Search search={srh}/>
     </div>
     :
     <div className="flex flex-wrap gap-12 pb-12">
      {filteredProducts.map((product) => {
        return<>
        <div className='w-56 cursor-pointer  transition-all duration-150 relative'>
          <Link to={`/products/categorie/${product.name}`}>
        <img src={`http://localhost/ecommerce%20project/admin/${product.images}`} alt="" className='w-full h-72 rounded-xl' />
        </Link>
        <div onClick={()=>addToCart(product.productid)} className={`absolute transition-all 
        duration-50 top-2 right-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white hover:bg-black`}><IoCart /></div>
        <div  onClick={()=>addToWishlist(product.productid)} className={`absolute transition-all duration-50 top-2 left-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white `}>
          <FaHeart /></div>
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

     }
      
      </div>
      <div>
      
      </div>
    </div>
    </div>
  );
}

export default Products;