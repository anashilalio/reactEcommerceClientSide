import React , {useEffect, useRef} from 'react'
import ebook from '../../public/ebooks.jpg'
import reading from '../../public/ebook.jpg'
import { motion ,useAnimation,useInView} from "framer-motion"

const AboutUs = () => {
  const ref = useRef(null);
  const ref2 = useRef(null);

  const isInview = useInView(ref , {once : true});
    const isInview2 = useInView(ref2 , {once : true});

  const mainControls =useAnimation();
  const mainControls2 =useAnimation();

  useEffect(()=>{
    if(isInview){
        mainControls.start("visible")
    }
},[isInview])
useEffect(()=>{
  if(isInview2){
      mainControls2.start("visible")
  }
},[isInview2])
  return (
    <div className='mx-16 space-y-32'>
            <motion.div
             ref={ref}

             variants={{hidden:{opacity:0 , y:75},visible:{opacity : 1 , y:0}}}
             initial="hidden"
             animate={mainControls}
         
           transition={{ duration: 1, delay: 0.25 }}>
            <div className='flex flex-nowrap  items-center justify-around'>
                <div className='w-130 text-2xl font-mono font-semibold'>

                Bienvenue à EBookShop, votre bibliothèque numérique pour des expériences de lecture captivantes. Depuis 2024, nous sommes passionnés par le fait de proposer des histoires captivantes et des connaissances aux lecteurs du monde entier.
                </div>
           
        
        <div>
            <img src={ebook} alt="" className='h-96 rounded-2xl w-96'/>
        </div>

        </div>  
            </motion.div>
            <motion.div
             ref={ref2}

             variants={{hidden:{opacity:0 , y:75},visible:{opacity : 1 , y:0}}}
             initial="hidden"
             animate={mainControls2}
         
           transition={{ duration: 1, delay: 0.25 }}
            >

            <div className='flex flex-nowrap  items-center justify-around'>
            <div>
            <img src={reading} alt="" className='h-96 rounded-2xl  w-96'/>
        </div>
                <div className='w-130 text-2xl font-mono font-semibold'>

                We are committed to providing exceptional customer service. Our dedicated support team is available 24/7 to assist you with any questions or issues you may have. From technical support to book recommendations, we're here to help.                </div>
           
        
        

        </div>  
            </motion.div> 
        
    </div>
  )
}

export default AboutUs