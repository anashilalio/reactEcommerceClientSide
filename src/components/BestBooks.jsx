import React from 'react'
import habits from '../../public/7habits.jpg' 
import deepwork from '../../public/deepwork.webp' 
import digitalMinimalism from '../../public/digitalMinimalism.png' 

const BestBooks = () => {
    const BestSellers = ({images , title})=>{
        return(
            <div className='h-120 w-84 hover:scale-105 duration-200 cursor-pointer'>
               
                <img src={images} alt="" className=' h-90p '/>
                <div className='text-center text-ms'>{title}</div>
            </div>
        )
    }
  return (
    <div className='h-screen space-y-12 mt-4 font-mono font-extrabold'>
        <div className="bestBooks text-5xl text-center"> best-selling </div>
        <div className='flex justify-around'>
        <BestSellers images={habits} title="7 habits of effective people"/>
        <BestSellers images={deepwork} title="Deep work"/>
        <BestSellers images={digitalMinimalism} title="Digital minimalism"/>
        </div>
    </div>
  )
}

export default BestBooks