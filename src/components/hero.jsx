import React from 'react'
import deepwork from '../../public/heroCoverBook.png'
import './hero.css'
const hero = () => {
  return (
    <div className='hero flex -mt-16  items-center h-screen transition-all overflow-hidden'>
        <div className="ml-4 content ">
        <h1 className='text-5xl text-black font-mono font-extrabold '>Discover Worlds Between Pages:  Journey Into Our Bookshop</h1>
        <div className='w-full flex '>
        <button className='mx-auto bg-black text-white font-mono font-extrabold
         px-6 py-2 rounded-lg mb-5 hover:shadow-xl hover:-translate-y-1 ease duration-200'>discover more</button>

        </div>
        </div>
        <img src={deepwork} alt="" className='h-3/5 ' />
        
    </div>
  )
}

export default hero