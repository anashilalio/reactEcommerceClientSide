import React from 'react'
import ebook from '../../public/ebooks.jpg'
const AboutUs = () => {
  return (
    <div className='mx-16'>
            
            <div className='text-center text-5xl mb-16'>À propos de nous</div>
            <div className='flex flex-nowrap gap-10 items-center justify-between'>
                <div className='w-130 text-2xl font-mono font-semibold'>

                Bienvenue à EBookShop, votre bibliothèque numérique pour des expériences de lecture captivantes. Depuis 2024, nous sommes passionnés par le fait de proposer des histoires captivantes et des connaissances aux lecteurs du monde entier.
                </div>
           
        
        <div>
            <img src={ebook} alt="" className='h-96'/>
        </div>

        </div>  
        
    </div>
  )
}

export default AboutUs