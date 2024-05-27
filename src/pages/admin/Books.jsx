import React, { useEffect, useState } from 'react'

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
    <div className='ml-72  '
    >
        <div className='text-center text-6xl my-8'>Books</div>
    <div className='shadow-2xl  mr-12 mb-12 rounded-lg overflow-hidden'>
    <div className='grid grid-cols-5 w-full border-b-2 h-20 align-center pl-12 text-2xl font-mono text-white bg-blue-600'>
                <div className='flex items-center'>image</div>
                <div className='flex items-center'>title</div>
                <div className='flex items-center'>category</div>
                <div className='flex items-center'>autheur</div>
                <div className='flex items-center'>date</div>

            </div>
        {books.map((book)=>{
            return<>
            <div className='grid grid-cols-5 w-full border-b-2 w-full pl-12 h-28 cursor-pointer hover:bg-gray-100'>
            <div  className='flex items-center'><img src={`http://localhost/ecommerce%20project/admin/${book.images}`} className='h-20' alt="" /></div>            
            <div className='flex items-center'>{book.name}</div>
            <div className='flex items-center'>{book.categorie}</div>
            <div className='flex items-center'>{book.autheur}</div>
            <div className='flex items-center'>{book.dat}</div>
            </div>
            </>
        })}
    </div>
         
    
    
    </div>
  )
}

export default Books