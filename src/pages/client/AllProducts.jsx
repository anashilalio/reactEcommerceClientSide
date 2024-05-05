import React, { useEffect ,useState , useContext } from 'react'
import { FaStar } from "react-icons/fa";
const AllProducts = () => {
    const [products, setProducts] = useState([]);

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

        {products.map((product) => {
        return<>
        <div className='w-56 cursor-pointer hover:scale-105 transition-all duration-150'>
        <img src={`http://localhost/ecommerce%20project/admin/${product.images}`} alt="" className='w-full h-72' />
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