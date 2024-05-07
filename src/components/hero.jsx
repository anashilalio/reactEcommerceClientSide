import React from 'react'
import './hero.css'
import cover  from '../../public/covers4.jpg';

const hero = () => {
  return (
    <div className='hero flex mt-16  items-center  transition-all overflow-hidden mb-20'>
      <img src={cover} alt="" className='h-72 w-full'/>
        <div className="ml-4 content absolute text-white">
        <h1 className='text-5xl  font-mono font-extrabold '>Découvrez les mondes entre les pages : voyagez dans notre librairie</h1>
        <div className='w-full flex '>
        <button className='mx-auto bg-black text-white font-mono font-extrabold
         px-6 py-2 rounded-lg mb-5 hover:shadow-xl hover:-translate-y-1 ease duration-200'>Explorez davantage</button>

        </div>
        </div>
        
    </div>
  )
}

export default hero