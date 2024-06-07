import React, { useState ,useEffect } from 'react'
import ahmed from "../../public/ahmed.jpg"
import imane from "../../public/imane.jpg"
import { FaStar } from "react-icons/fa";

import { FaStarHalfAlt } from "react-icons/fa";

const CustomersReviews = () => {
    const [xpos , setXpos ] = useState(0) ;
    const [first , setFirst] = useState(0);
     
    const Reviews = ({ photo }) => {
        return <>
        <div className='flex items-center gap-6'>
           <img src={photo} alt="" className='rounded-full w-12'/>
                <h1 className='text-xl font-bold '>Name</h1>
        </div>
                
            <div className='reviewtext mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quod pariatur eos itaque voluptate consectetur
                minima commodi. Voluptates vero
                qui placeat? Placeat tenetur earum et assumenda maiores minus, architecto laboriosam.</div>
            <div className='star flex text-orange-500 mt-4'>
                {[...Array(4)].map((e)=>{return <FaStar/>})}
                <FaStarHalfAlt />
            </div>
            
        </>
    }
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

          return () => clearTimeout(scroll); // Clear the timeout when the component is unmounted or before the next render

  }, [xpos]);
//   const nextButton = () => {
//     setXpos(prevXpos => {
//       return prevXpos+27.5;
//     });
  
//     setReviews(prevReviews => {
//         const firstReview = prevReviews[first];
//         const remainingReviews = [...prevReviews];
//         remainingReviews.push(firstReview); // Add firstReview to the end of remainingReviews
//         setFirst(e => e + 1); // Increment the 'first' state
//         return remainingReviews; // Return the updated array
//       });
//   };
    return (
        <div className='ml-8 mt-32 h-screen  flex-col overflow-hidden text-white'>
            <div className=" flex justify-around items-center mt-auto gap-6 ">
                {reviews.map((photo, index)=>{
                    return <div className='bg px-8 bg-black h-64 w-120 shrink-0 transition-all duration-300  rounded-xl shadow-2xl' style={{transform:`translateX(-${xpos}rem)` ,transition:"all 2s"} }>
                     <Reviews key={index} photo={photo} />
                     </div>
                })}
            </div>
        </div>
    )
}

export default CustomersReviews