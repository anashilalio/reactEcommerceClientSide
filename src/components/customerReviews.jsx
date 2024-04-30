import React, { useState ,useEffect } from 'react'
import ahmed from "../../public/ahmed.jpg"
import imane from "../../public/imane.jpg"

import { transform } from 'framer-motion';
import { all } from 'axios';
const CustomersReviews = () => {
    const [xpos , setXpos ] = useState(0) ;
    
     
    const Reviews = ({ photo }) => {
        return <>
        
                <img src={photo} alt="" className='rounded-full w-12'/>
            <div className='reviewtext '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quod pariatur eos itaque voluptate consectetur
                minima commodi. Voluptates vero
                qui placeat? Placeat tenetur earum et assumenda maiores minus, architecto laboriosam.</div>
            <div className='star'></div>
            
        </>
    }
    const [reviews, setReviews] = useState([imane, ahmed, ahmed, ahmed, ahmed, ahmed]);
useEffect(() => {
    
        setReviews(prevReviews => {
            const firstReview = prevReviews[0];
            const remainingReviews = [...prevReviews];
            remainingReviews.shift();
            remainingReviews.push(firstReview);
            return remainingReviews;
          });
      

  }, [xpos]);
    const nextButton = ()=>{
        
        setXpos(prevXpos => prevXpos + 28);
        
    }
    return (
        <div className='h-screen  flex-col overflow-hidden'>
            <div>CustomersReviews</div>
            <div className=" ml-8 flex justify-around items-center mt-auto gap-6 ">
                {reviews.map((photo, index)=>{
                    return <div className='bg bg-slate-900 h-64 w-120 shrink-0 transition-all duration-300' style={xpos<165 ? {transform:`translateX(-${xpos}rem)` ,transition:"all 2s"}:{transform:`translateX(0rem)` ,transition:"all 2s"} }>
                     <Reviews key={index} photo={photo} />
                     </div>
                })}
            </div>
            <button onClick={nextButton}>next</button>
        </div>
    )
}

export default CustomersReviews