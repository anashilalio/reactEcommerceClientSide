import React from 'react'
import deepwork from '../../public/cover.jpg'

const hero = () => {
  return (
    <div className='flex justify-around items-center'>
        <div className="content absolute">
        <h1 className='text-5xl text-black font-mono font-extrabold'>Discover Worlds Between Pages: <br /> Journey Into Our Bookshop</h1>
        <button className='ml-60 py-2 px-4 mt-4 bg-blue-500 font-mono hover:bg-blue-400'>discover</button>
        </div>

        <img src={deepwork} alt="" className=' h-screen w-full'/>
    </div>
  )
}

export default hero