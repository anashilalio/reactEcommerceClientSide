import React from 'react'
import './hero.css'
import cover from '../../public/coverTest.png';
import { Link } from 'react-router-dom';

const hero = () => {
  return (
    <div className='hero flex items-center h-screen text-black  relative' >
      <div className="ml-44 content  w-120">
        <h1 className='text-5xl  font-mono font-extrabold '>Découvrez les mondes entre les pages : voyagez dans notre librairie</h1>
        <div className='w-full flex '>
          <button className='mx-auto bg-blue-500 mt-4 text-white font-mono font-extrabold
         px-6 py-2 rounded-3xl mb-5 hover:shadow-xl hover:-translate-y-1 ease duration-200'><Link to='/categorie'>Explorez davantage</Link></button>

        </div>


      </div>
      <img src={cover} className='  top-0 -z-10 absolute w-full bg-cover' style={{ height: "620px", width: "2000px" }} />
    </div>
  )
}

export default hero