import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
const Books = () => {
    const [books , setBooks ] = useState([]);
    useEffect(()=>{
        const listOfBooks = async ()=>{
            const response = await fetch("http://localhost/ecommerce%20project/client/product.php");
            const jsonn = await response.json();
            console.log(jsonn)
            setBooks(jsonn);
        }
        listOfBooks();
    },[])
    
  return (
    <div className='pl-72  bg-gray-100'
    >
        <div className='text-center text-6xl py-8'>Books</div>
    <div className=' pr-12 pb-12  overflow-hidden'>
    <div className='grid grid-cols-6 w-full border-b-2 h-20 align-center pl-12 text-2xl font-mono text-white bg-blue-600 mb-4 rounded-2xl shadow'>
                <div className='flex items-center'>image</div>
                <div className='flex items-center'>title</div>
                <div className='flex items-center'>category</div>
                <div className='flex items-center'>autheur</div>
                <div className='flex items-center'>date</div>
                <div className='flex items-center'>Modify</div>


            </div>
        {books.map((book)=>{
            return<>
            <div className='grid grid-cols-6 w-full border-b-2 w-full pl-12 h-28 cursor-pointer rounded-2xl shadow mb-4 hover:bg-gray-200'>
            <div  className='flex items-center'><img src={`http://localhost/ecommerce%20project/admin/${book.images}`} className='h-20' alt="" /></div>            
            <div className='flex items-center'>{book.name}</div>
            <div className='flex items-center'>{book.categorie}</div>
            <div className='flex items-center'>{book.autheur}</div>
            <div className='flex items-center'>{book.dat}</div>
            <div className='flex items-center gap-4'><PiNotePencilBold className='hover:text-blue-500'/> <FaTrashAlt className='hover:text-blue-500'/> </div>

            </div>
            </>
        })}
    </div>
         
    
    
    </div>
  )
}

export default Books