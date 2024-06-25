import React, { useState ,useEffect } from 'react'
import ahmed from "../../public/ahmed.jpg"
import imane from "../../public/imane.jpg"
import { FaStar } from "react-icons/fa";

import { FaStarHalfAlt } from "react-icons/fa";

const CustomersReviews = () => {
    const [xpos , setXpos ] = useState(0) ;
    const [first , setFirst] = useState(0);
     
    const Reviews = [{
        name : "Anas" , 
        photo : ahmed,
        review : "this is a very good product", 
        rating : 4
    },
    {
        name : "Mohamed" ,
        photo : ahmed,

        review : "this is a very good product", 
        rating : 4
    },
    {
        name : "Imane" , 
        photo : imane,

        review : "this is a very good product", 
        rating : 4
    },
    {
        name : "anas" , 
        review : "this is a very good product", 
        rating : 4
    }

    ]
    const [reviews, setReviews] = useState([imane, ahmed, ahmed, imane, ahmed, ahmed]);
useEffect(() => {
    
        setReviews(prevReviews => {
            
            const firstReview = prevReviews[first];
            const remainingReviews = [...prevReviews];
            remainingReviews.push(firstReview);
            
            return remainingReviews;
          });
          const scroll = setTimeout(() => {
            setXpos(prevXpos => {
                return prevXpos+27.5;
              });
          }, 2000);
          setFirst(e=>e+1);

          return () => clearTimeout(scroll); 

  }, [xpos]);
    return (
        <div className='ml-8 mt-32 h-screen  flex-col overflow-hidden text-white pt-44'>
            <div className=" flex justify-around items-center mt-auto gap-6 ">
                {Reviews.map((e)=>{
                    return <div className='bg px-8 h bg-black text-white h-64 space-y-2 w-120 shrink-0 transition-all duration-300  rounded-xl shadow-2xl' >
                        
                        <div className='text-xl font-bold flex  items-center gap-4'>
                            <img src={e.photo} className='size-12 rounded-full' alt="" />
                            {e.name}
                            </div>
                        <div className='h-40'>{e.review}</div>
                        <div className="flex">
                        {[...Array(5)].map((e , index)=>{
                            return <FaStar className="text-orange-400" />
                                
                            
                            
                        })}</div>
                     </div>
                })}
            </div>
        </div>
    )
}

export default CustomersReviews