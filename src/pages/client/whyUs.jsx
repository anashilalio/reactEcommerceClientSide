import React , {useEffect, useRef} from 'react'
import instantAccess from '../../../public/instantAccess.png' 
import portability from '../../../public/portability.png' 
import search from '../../../public/search.webp' 
import { motion ,useAnimation,useInView} from "framer-motion"
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
        <div className='text-4xl text-center mb-20'>Why Choose Ebooks</div>
        <div className="flex justify-center gap-32">
            <div>
                <div><img src={instantAccess} className='size-44' alt="" /></div>
                <div className='text-3xl w-64'> Instant Access</div>
                <div className='w-64'>With ebooks, there's no waiting for shipping or making a trip to the bookstore.</div>
            </div>
            <div>
                <div><img src={portability} className='size-44' alt="" /></div>
                <div className='text-3xl w-64'> Convenience and Portability</div>
                <div className='w-64'>Ebooks allow you to carry an entire library with you wherever you go.</div>
           
            </div>
            <div>
                <div><img src={search} className='size-44' alt="" /></div>
                <div className='text-3xl w-64'>  Search and Highlight Features</div>
                <div className='w-64 '>Ebooks come with powerful search capabilities that let you find specific passages or topics quickly.</div>
           
            </div>
        </div>
    </motion.div>
  )
}

export default WhyUs