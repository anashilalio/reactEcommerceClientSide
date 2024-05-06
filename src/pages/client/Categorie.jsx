import React, { useContext, useEffect, useState } from 'react'
import CategorieType from './CategorieType';
import { Link } from 'react-router-dom';
import ContextProviderClient, { contextProviderInfo } from '../../context/ContextProvider';
import AllProducts from './AllProducts';
const Categorie = () => {
    const [categories , setCategories ] = useState([{}]);
    useEffect(()=>{
        const getCategories = async ()=>{
            const response = await fetch("http://localhost/ecommerce%20project/client/getCategorie.php");
            const res = await response.json();
            
            setCategories(res)
         }
         getCategories();
    },[])

    const {currentCtg , setCurrentCtg} = useContext(contextProviderInfo)
    console.log("categorie : ", categories)
  return (
    <div>
    <div className='w-64 shadow-md shadow fixed top-16 h-screen space-y-8 '>
      <div className='mt-16'>
      <Link to='/categorie' onClick={()=>setCurrentCtg(null)} className='ml-10  mt-20   cursor-pointer hover:opacity-70 text-lg font-mono'>recent BOOKS</Link>
      </div>
        {categories.map((ctg)=>{
            return<>
                        <Link   to={`/products/${ctg.categorie}`} 
        onClick={()=>setCurrentCtg(ctg.categorie)} className={ctg.categorie===currentCtg ?'ml-12 mt-20  cursor-pointer hover:opacity-70 text-lg font-mono text-slate-400':'ml-12 mt-20  cursor-pointer hover:opacity-70 text-lg font-mono'}><CategorieType title={ctg.categorie}/></Link>
    
            </>
        })}
      
        </div>
       {currentCtg==null&& <AllProducts />
}
    </div>
    
  )
}

export default Categorie