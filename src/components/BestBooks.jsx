import React, { useState, useEffect, useRef } from 'react';
import habits from '../../public/7habits.jpg' 
import deepwork from '../../public/deepwork.webp' 
import digitalMinimalism from '../../public/digitalMinimalism.png' 
import { color } from 'framer-motion';
import { all } from 'axios';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaCircle } from "react-icons/fa6";

const BestBooks = () => {
 

    return (
        <div  className='space-y-12 mt-4 font-mono font-extrabold   h-screen mx-16 rounded-2xl flex
        justify-center  gap-12 items-center relative
        '>
            <div className='absolute text-6xl top-3 flex gap-6'>Best Sellers 
            <p className=' text-white bg-green-500 rounded px-2 '>Books</p> 
            
            </div>
            <button className='bg-gradient-to-r from-green-400 to-green-600 rounded-full mt-10 cursor-pointer shadow-lg 
            hover:opacity-70'><GrFormPrevious className='size-12 text-white' /></button>
  
          <div>
             <img src={habits} alt="" className='rounded-xl h-96 w-72 shadow-xl' />   
        </div>  
        <div className='w-96 space-y-10'>
            <div className='text-3xl'>
            The 7 Habits of Highly Effective People 
            </div>
            <div>
            The 7 Habits of Highly Effective People, first published in 1989, is a business and self-help book written by Stephen R. Covey. Covey defines effectiveness as the balance of obtaining desirable results with caring for that which produces those results.
            </div>
            <div className='text-xl'>
                Stephn Coffy
            </div>
        </div>
            <button className=' bg-gradient-to-r from-green-400 to-green-600 rounded-full cursor-pointer shadow-lg'><MdNavigateNext className='size-12 text-white' /></button>
            <div className='absolute bottom-8 flex gap-4'>
            <FaCircle className='text-green-500 shadow cursor-pointer'/>
                {[...Array(3)].map(()=>{
                    return <FaCircle className='text-green-200 shadow cursor-pointer'/>
                })}
            </div>
        </div>
    )
}

export default BestBooks