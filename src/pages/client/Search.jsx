import React ,{useState , useContext , useEffect} from 'react'
import { contextProviderInfo } from '../../context/ContextProvider';

const Search = () => {
    const [Products , setProducts  ] = useState([]);
    const { result , setResult  } = useContext(contextProviderInfo)

    // useEffect(()=>{
    //   async function fetchProducts() {
    //     let res = await fetch("http://localhost/ecommerce%20project/client/Product.php");
    //     let json = await res.json();
    //     setProducts(json)
    //   }
    //   fetchProducts();
    //   const results = Products.filter((e)=>{
    //     return e.name.toLowerCase().includes(search);
    //   })
    //   console.log(results)
    // },[search])
  return (
    <div className='mt-20 flex gap-12 mx-16 text-center'>
        {result.map((e)=>{
            return <div className='w-44'>
                <div><img src={`http://localhost/ecommerce%20project/admin/${e.images}`} className='w-full' alt="" /></div>
                <div>{e.name}</div>
            </div>
        })}
    </div>
  )
}

export default Search