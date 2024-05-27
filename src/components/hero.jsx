import React from 'react'
import './hero.css'
import cover  from '../../public/covers7.png';
import { Link } from 'react-router-dom';

const hero = () => {
  return (
    <div className='hero flex items-center  h-screen text-black justify-around '>
        <div className="ml-4 content  ">
        <h1 className='text-5xl  font-mono font-extrabold '>Découvrez les mondes entre les pages : voyagez dans notre librairie</h1>
        <div className='w-full flex '>
        <button className='mx-auto bg-blue-500 mt-4 text-white font-mono font-extrabold
         px-6 py-2 rounded-3xl mb-5 hover:shadow-xl hover:-translate-y-1 ease duration-200'><Link to='/categorie'>Explorez davantage</Link></button>

        </div>
        

        </div>
        <div>
        <img src={cover} className='ml-12'  style={{height:"550px" , width:"2000px"}}/>
        </div>
    </div>
  )
}

export default hero