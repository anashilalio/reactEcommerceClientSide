import React, { useContext } from 'react';
import './hero.css';
import { contextProviderInfo } from '../context/ContextProvider';
import cover from '../../public/cover10.png';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const Hero = () => {
  const { setSearch, search } = useContext(contextProviderInfo);

  return (
    <div className='hero flex justify-between items-center h-screen text-black relative'>
      <div className="ml-44 content">
        <h1 className='text-6xl font-bold leading-tight text-black'>Découvrez les mondes entre les pages : voyagez dans notre librairie</h1>
        <div className='w-full flex'>
          <div className='relative w-full mt-16'>
            <Link to={`/products/HORROR?search=${search}`}>
              <FaSearch className='absolute text-green-600 top-4 right-6 cursor-pointer text-3xl' />
            </Link>
            <input
              type="text"
              placeholder='SEARCH FOR A BOOK'
              className='w-full rounded-full outline-none text-black px-12 border h-16 bg-white shadow shadow-green-200'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
         
        </div>
      </div>
      <img src={cover} className='bg-cover opacity-90' style={{ width: '600px' }} />
    </div>
  );
}

export default Hero;
