import React ,{useContext} from 'react'
import './hero.css'
import { contextProviderInfo } from '../context/ContextProvider';
import cover from '../../public/cover10.png';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const hero = () => {
  const {  setResult,search , setSearch , login , setLogin ,clientdata } = useContext(contextProviderInfo)

  return (
    <div className='hero flex justify-between items-center h-screen text-black  relative' >
      <div className="ml-44 content  ">
        <h1 className='text-5xl    ultra'>Découvrez les mondes entre les pages : voyagez dans notre librairie</h1>
        <div className='w-full flex '>
          {/* <button className='mx-auto bg-green-500 mt-4 text-white font-mono font-extrabold
         px-6 py-2 rounded-3xl mb-5 hover:shadow-xl'><Link to='/categorie'>Explorez davantage</Link></button> */}
         <div className='relative w-full mt-16'>
         <Link to="/Search" >
          <FaSearch className='absolute text-green-600 top-4 right-6  cursor-pointer text-3xl ' />
          </Link>
        <input type="text" placeholder='SEARCH FOR A BOOK' className='w-full  rounded-full outline-none text-black px-12 border h-16 bg-white shadow shadow-green-200' value={search} onChange={(e)=>setSearch(e.target.value)}/>
         </div>
          
        </div>


      </div>
      <img src={cover} className='   bg-cover opacity-90' style={{width:'600px'}}  />
    </div>
  )
}

export default hero