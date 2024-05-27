import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";

const categories = () => {
    const  [categoriesList  ,setCategoriesList ] = useState([]);
    const [change , setChange ] = useState(0);
    useEffect(()=>{
        const categorie =async()=>{
            let response = await fetch("http://localhost/ecommerce%20project/admin/categories.php");
            let message = await response.json();
            setCategoriesList(message)
        }
        categorie();
        

    },[change])
    const deleteCategorie = async(name)=>{
        let response = await axios.post("http://localhost/ecommerce%20project/admin/deleteCategorie.php" ,{name}) ;
        console.log(response.data)
        setChange(change+1);
    }
    
  return (
    <div className='ml-72 mr-12 mt-12 '>
        <div className='text-6xl mb-12 text-center'>Categories</div>
        <div className='shadow-2xl '>
        <div className='grid grid-cols-4 h-12 border-b-2 text-white bg-blue-600 text-3xl '>
            <div className='ml-12'>name</div>
           <div>description</div>
           <div>Number of books</div>
           <div>modify</div>


        </div>
        {categoriesList.map((cat)=>{
            return <div className='grid grid-cols-4 h-12 border-b-2 pt-2 hover:bg-gray-50 '>
                <div className='ml-12 font-mono text-xl'>{cat.categorie}</div>
                <div className=' line-clamp-1 text-wrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nihil excepturi labore quod sapiente repellendus voluptatem eaque laborum veritatis? Iusto facilis iste et necessitatibus illum quo laudantium excepturi illo quos.</div>
                <div className='text-2xl text-center'>123</div>
                <div><button className=' px-4 py-1 rounded-xl text-black hover:text-blue-500'><PiNotePencilBold /></button>
                <button  className=' px-4 py-1 rounded-xl text-black hover:text-blue-500'
                 onClick={()=>deleteCategorie(cat.categorie)}><FaTrashAlt /></button></div>
            </div>
        })} 
        </div>
        
        
        
       
        
    </div>
  )
}

export default categories