import React ,{useState , useContext , useEffect} from 'react'
import { contextProviderInfo } from '../../context/ContextProvider';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
const Search = ({search}) => {
    const [Products , setProducts  ] = useState([]);
    const [resultts , setResultts  ]= useState([])
    useEffect(()=>{
      async function fetchProducts() {
        let res = await fetch("http://localhost/ecommerce%20project/client/Product.php");
        let json = await res.json();
        setProducts(json)
      }
      fetchProducts();
      const results = Products.filter((e)=>{
        return e.name.toLowerCase().includes(search);
      })
      setResultts(results)
    },[search])
    console.log(resultts)
  return (
    <div className='mt-4 flex flex-wrap gap-12 text-center'>
        {resultts.map((e)=>{
          return <div className='w-56 relative'>
             <Link to={`/products/categorie/${e.name}`}>
             <img src={`http://localhost/ecommerce%20project/admin/${e.images}`} alt="" className='w-full h-72 rounded-xl' />
             </Link>
             <div  className={`absolute transition-all 
        duration-50 top-2 right-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white hover:bg-black`}><IoCart /></div>
        <div   className={`absolute transition-all duration-50 top-2 left-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white `}>
          <FaHeart /></div>
        <h1 className='text-xl font-extrabold text-center font-mono '>{e.name}</h1>
        <h3 className='text-xl text-center'>{e.categorie}</h3>
        <div className='flex mx-20'>
        {[...Array(5)].map((_, index) => <FaStar key={index} color='orange' />)}
        </div>
        
        
        <h3 className='text-xl text-center'>{e.price} DH</h3>
          </div>
        })}
    </div>
  )
}

export default Search