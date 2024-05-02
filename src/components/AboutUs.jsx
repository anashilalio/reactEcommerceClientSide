import React from 'react'
import ebook from '../../public/ebooks.jpg'
const AboutUs = () => {
  return (
    <div className='mx-16'>
            
            <div className='text-center text-5xl mb-16'>About us</div>
            <div className='flex flex-nowrap gap-10 items-center justify-between'>
                <div className='w-130 text-2xl font-mono font-semibold'>

        Welcome to EBookShop, your digital library for immersive reading experiences. Since 2024,
         we have been passionate about bringing captivating stories and knowledge to readers worldwide.
                </div>
           
        
        <div>
            <img src={ebook} alt="" className='h-96'/>
        </div>

        </div>  
        
    </div>
  )
}

export default AboutUs