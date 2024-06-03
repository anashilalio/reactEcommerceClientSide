import React, { useEffect ,useState , useContext } from 'react'
import { FaStar } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { contextProviderInfo } from '../../context/ContextProvider';
import axios from 'axios';
const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [beingHover , setBeingHover  ] = useState(null);
    const [wishlistProductId , setWishlistProductId ] = useState() // separate state for wishlist product ID
    const [cartProductId , setCartProductId ] = useState() // separate state for cart product ID
    const {clientdata } = useContext(contextProviderInfo)
    const clientid = parseInt(clientdata);
    useEffect(() => {
        async function fetchProducts() {
          let res = await fetch("http://localhost/ecommerce%20project/client/Product.php");
          let json = await res.json();
          setProducts(json);
        }
        fetchProducts();
        
      }, []);
      useEffect(()=>{
        const Addtowishlist =async () =>{
          let response = await axios.post("http://localhost/ecommerce%20project/client/wishlist.php" , { proudctid : wishlistProductId ,clientid : clientid })
          console.log(response)
        }
        Addtowishlist();
        
      },[wishlistProductId])
      useEffect(()=>{
        const addtocart = async ()=>{
          let ds = await axios.post("http://localhost/ecommerce%20project/client/cart.php" , { productid : cartProductId ,clientid : clientid })
          console.log(ds)
        }
        addtocart();
      },[cartProductId])
      const {categorie}=useParams();
      
  return (
    <div className='ml-96 mt-32 flex gap-12 flex-wrap'>

        {products.map((product , index) => {
        return<>
        <div className='w-56 cursor-pointer  transition-all duration-150 relative' key={index}>
          <Link to={`http://localhost:5173/products/categorie/${product.name}`}>
          <img src={`http://localhost/ecommerce%20project/admin/${product.images}`} alt="" className={`w-full h-72`} 
        onMouseEnter={() => setBeingHover(index)}
        onMouseLeave={() => setBeingHover(null)}/>
          </Link>
        
              <div className={`absolute transition-all 
        duration-50 top-2 right-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white hover:bg-black`}  onClick={()=>setCartProductId(product.productid)}><IoCart /></div>
        <div className={`absolute transition-all 
        duration-50 top-2 left-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white `} onClick={()=>setWishlistProductId(product.productid)}><FaHeart /></div>
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
  )
}

export default AllProducts