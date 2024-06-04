import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";

const Reviews = () => {
    const [reviews , setReviews ] = useState([]);
    useEffect(()=>{
        const review=async()=>{
            const response = await fetch("http://localhost/ecommerce%20project/admin/Reviews.php");
            const res = await response.json();
            setReviews(res);
        }
        review();
    },[])
  return (
    <div className='pl-64 bg-gray-50'>
        <div className='text-5xl text-center'>Reviews</div>
        
        <div className='flex flex-wrap justify-around'>
        {reviews.map((review)=>{
            return <div className='mb-4 shadow-xl p-5 w-120 h-56 rounded-xl bg-white'>
                <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <img src={`http://localhost/ecommerce%20project/client/${review.photo}`} className='size-10 rounded-full' alt="" />
                    {review.username}
                </div>
               
                    <div>
                        <p className='hover:underline ' > {review.name}</p>
                       
                    </div>
                </div>
                <div className='mt-2'>
                <div className='flex mb-2'>
                    {[...Array(5)].map((star ,index)=>{
                        return <>
                        
                        <FaStar className={`cursor-pointer ${ review.rate >= index ? 'text-blue-500' : '' }`} onMouseEnter={()=>setHover(index) } />
                        </>
                        
                    })}
                    </div>
                    {review.dat}</div>

                <div className='line-clamp-3'>{review.comments}</div>
                </div>
        })}
        </div>
        
    </div>
  )
}

export default Reviews