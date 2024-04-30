import React from 'react'
import history from '../../public/history.jpg';
import horror from '../../public/horror.jpg';
import math from '../../public/math.jpg';

const Categories = () => {
    const Categorie= ({image , title})=>{
        return<>
        <div className="categorie h-120 cursor-pointer hover:bg-slate-200 hover:scale-105 ease-in duration-300 rounded-lg overflow-hidden">
            <img src={image} alt="" className=' bg-cover h-90p'/>
            <div className="title text-center text-3xl">{title}</div>
        </div>
        </>
        
    }
  return (
    <div className='space-y-6 h-screen'>
        <div className="title text-center text-5xl font-mono font-extrabold ">Categories </div>
        <div className="categories flex justify-around items-center">
            <Categorie image={history} title="history"/>
            <Categorie image={horror} title="horror"/>
            <Categorie image={math} title="math"/>

        </div> 
        <div className='flex '>
        <button className='mx-auto bg-black text-white font-mono font-extrabold
         px-6 py-2 rounded-lg mb-5  hover:shadow-inherit hover:scale-105 ease duration-200 hover:shadow-2xl'>discover more</button>
        </div>
    </div>
  )
}

export default Categories