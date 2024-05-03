import React, { useEffect, useState } from 'react'

const Categorie = () => {
    const [categories , setCategories ] = useState([{}]);
    useEffect(()=>{
        const getCategories = async ()=>{
            const response = await fetch("http://localhost/ecommerce%20project/client/getCategorie.php");
            const res = await response.json();
            
            setCategories(res)
            console.log("response" , res);
         }
         getCategories();
         
    },[])
    console.log("categorie : ", categories)
  return (
    <div className='w-72 shadow-md shadow-white fixed top-16 h-screen space-y-8'>
        
    {categories.map((ctg)=>{
        return<>
                    <div>{ctg.categorie}</div>

        </>
    })}
    </div>
  )
}

export default Categorie