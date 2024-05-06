import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdAddCircle } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import logo from '../../public/logoWhite.png'
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";

export const Navbar = (props) => {
  const location = useLocation();

  // If the current path is /Login, don't render the Navbar
  if (location.pathname === '/SignIn' || location.pathname==="/Login") {
    return null;
  }
  return (
    <div className='fixed top-0 z-10 '>
      {props.item ?
      <div className='bg flex gap-4 justify-between px-6 h-16 items-center  bg-black text-white w-screen'>
        <div>
        <Link to="/"><img src={logo} alt="" className='size-20' /></Link>
        </div>
        <div className='relative'>
        <FaSearch className='absolute text-black top-2 left-3 cursor-pointer text-xl ' />
        <input type="text" className='w-120 h-8 rounded-2xl outline-none text-black px-12' />
        </div>

        <div className='flex  gap-2 items-center'>
        <br />
        <Link to='categorie'  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg hover:opacity-80'>
        Categorie
        </Link>
        <Link to="/ContactUs" className='hover:bg-black hover:text-white px-4 py-1 rounded-lg hover:opacity-80'>ContactUs</Link>
        <Link to="/cart" className='hover:bg-black hover:text-white px-4 py-1 rounded-lg hover:opacity-80 ml-20'><FaShoppingCart /></Link>
        <Link to="/SignIn"  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg hover:opacity-80'>SignIn</Link>
        <Link to='/Login'  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg hover:opacity-80'>Login</Link>
        </div>
      </div>
      
      :
      <div className='bg-black text-white flex flex-col    px-6 h-screen  items-center '>
        <div>
            <Link to="/"><img src={logo} alt="" className='size-32' /></Link>
        </div>
        <div className='flex  gap-10 flex-col mt-2 '>
        <Link to='/Users'  className=' hover:opacity-80 px-4 py-1 rounded-lg flex items-center gap-2'><FaUser />Users</Link>
        <Link to="/addCategorie"  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><BiSolidCategory/>addCategorie</Link>
        <Link to="/addCategorie"  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><BiSolidCategoryAlt/>categories</Link>
        <Link to='/addProductForm'  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><MdAddCircle />Add Book</Link>
        <Link to='/Books'  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><FaBook />Books</Link>
        <Link to='/addProductForm'  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><MdOutlineReviews />Reviews</Link>



        <Link to="/signin"  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg  flex items-center gap-2'><IoLogOut />Logout</Link>
        
        
     
        </div>
      </div>
      }
        
        
    </div>
  )
}
export default Navbar
