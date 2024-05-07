import React, { useEffect, useState } from 'react'

const categories = () => {
    const  [categoriesList  ,setCategoriesList ] = useState([]);
    useEffect(()=>{
        const categorie =async()=>{
            let response = await fetch("http://localhost/ecommerce%20project/admin/categories.php");
            let message = await response.json();
            setCategoriesList(message)
        }
        categorie();
        

    },[])
    
  return (
    <div className='ml-72 mr-12 mt-12 '>
        <div className='text-6xl mb-12 text-center'>Categories</div>
        <div className='shadow-2xl'>
        <div className='grid grid-cols-3 h-12 border-b-2 text-white bg-black text-3xl '>
            <div className='ml-12'>name</div>
            <div>delete</div>
            <div>modify</div>

        </div>
        {categoriesList.map((cat)=>{
            return <div className='grid grid-cols-3 h-12 border-b-2 pt-2 hover:bg-gray-100 '>
                <div className='ml-12 font-mono text-xl'>{cat.categorie}</div>
                <div><button className='bg-yellow-500 px-4 py-1 rounded-xl text-white hover:opacity-60'>modify</button></div>
                <div><button  className='bg-red-500 px-4 py-1 rounded-xl text-white hover:opacity-60'>delete</button></div>
            </div>
        })} 
        </div>
        
        
        
       
        
    </div>
  )
}

export default categories