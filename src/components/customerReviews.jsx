import React, { useState ,useEffect } from 'react'
import ahmed from "../../public/ahmed.jpg"
import imane from "../../public/imane.jpg"

import { transform } from 'framer-motion';
import { all } from 'axios';
const CustomersReviews = () => {
    const [xpos , setXpos ] = useState(0) ;
    const [first , setFirst] = useState(0);
     
    const Reviews = ({ photo }) => {
        return <>
        
                <img src={photo} alt="" className='rounded-full w-12'/>
            <div className='reviewtext '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quod pariatur eos itaque voluptate consectetur
                minima commodi. Voluptates vero
                qui placeat? Placeat tenetur earum et assumenda maiores minus, architecto laboriosam.</div>
            <div className='star'></div>
            
        </>
    }
    const [reviews, setReviews] = useState([imane, ahmed, ahmed, imane, ahmed, ahmed]);
useEffect(() => {
    
        setReviews(prevReviews => {
            
            const firstReview = prevReviews[first];
            const remainingReviews = [...prevReviews];
            
            remainingReviews.push(firstReview);
            setFirst(e=>e+1)
            return remainingReviews;
          });
      

  }, [xpos]);
  const nextButton = () => {
    setXpos(prevXpos => {
      return prevXpos+27.5;
    });
  
    setReviews(prevReviews => {
        const firstReview = prevReviews[first];
        const remainingReviews = [...prevReviews];
        remainingReviews.push(firstReview); // Add firstReview to the end of remainingReviews
        setFirst(e => e + 1); // Increment the 'first' state
        return remainingReviews; // Return the updated array
      });
  };
    return (
        <div className='h-screen  flex-col '>
            <div>CustomersReviews</div>
            <div className=" ml-8 flex justify-around items-center mt-auto gap-6 ">
                {reviews.map((photo, index)=>{
                    return <div className='bg bg-slate-900 h-64 w-120 shrink-0 transition-all duration-300' style={{transform:`translateX(-${xpos}rem)` ,transition:"all 2s"} }>
                     <Reviews key={index} photo={photo} />
                     </div>
                })}
            </div>
            <button onClick={nextButton}>next</button>
        </div>
    )
}

export default CustomersReviews