import React , {useEffect, useRef} from 'react'

import { motion ,useAnimation,useInView} from "framer-motion"
import { IoSearchSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";

const WhyUs = () => {
    const ref = useRef(null);
    const isInview = useInView(ref , {once : true});
    const mainControls =useAnimation();
    useEffect(()=>{
        if(isInview){
            mainControls.start("visible")
        }
    },[isInview])
  return (
    <motion.div 
    ref={ref}

    variants={{hidden:{opacity:0 , y:75},visible:{opacity : 1 , y:0}}}
    initial="hidden"
    animate={mainControls}

  transition={{ duration: 1, delay: 0.25 }}
    className='my-32'>
        
        <div className="flex justify-center gap-32 itesm-center">
            <div className='flex flex-col items-center text-center  '>
                <div><FaBookReader className='size-16 '/></div>
                <div className='text-3xl w-64'> Read Anywhere, Anytime</div>
                <div className='w-64'>Our eBooks are compatible with all major devices and platforms, including Kindle, iPad, Nook, and smartphones</div>
            </div>
            <div className='flex flex-col items-center text-center '>
                <div><FaStar className='size-16'/></div>
                <div className='text-3xl w-64'> Reviews</div>
                <div className='w-64'>Join our vibrant community of book lovers! Share your thoughts, write reviews, and connect with other readers.</div>
           
            </div>
            <div className='flex flex-col items-center text-center '>
                <div><IoSearchSharp className='size-16'/></div>
                <div className='text-3xl w-64'>  Search and Highlight Features</div>
                <div className='w-64 '>Ebooks come with powerful search capabilities that let you find specific passages or topics quickly.</div>
           
            </div>
        </div>
    </motion.div>
  )
}

export default WhyUs