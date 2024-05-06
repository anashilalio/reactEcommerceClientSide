import React, { useEffect ,useState , useContext } from 'react'
import { FaStar } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [beingHover , setBeingHover  ] = useState(null);
    useEffect(() => {
        async function fetchProducts() {
          let res = await fetch("http://localhost/ecommerce%20project/client/Product.php");
          let json = await res.json();
          setProducts(json);
          console.log(json)
        }
        fetchProducts();
        
      }, []);
  return (
    <div className='ml-96 mt-32 flex gap-12 flex-wrap'>

        {products.map((product , index) => {
        return<>
        <div className='w-56 cursor-pointer  transition-all duration-150 relative' key={index}>
        <img src={`http://localhost/ecommerce%20project/admin/${product.images}`} alt="" className={`w-full h-72`} 
        onMouseEnter={() => setBeingHover(index)}
        onMouseLeave={() => setBeingHover(null)}/>
              <div className={`absolute transition-all 
        duration-50 top-2 right-2 text-slate-800 text-lg bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100`}><IoCart /></div>

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