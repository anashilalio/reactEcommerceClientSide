import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = (props) => {
  const location = useLocation();

  // If the current path is /Login, don't render the Navbar
  if (location.pathname === '/SignIn' || location.pathname==="/Login") {
    return null;
  }
  return (
    <div className='fixed top-0 z-10 w-full'>
      {props.item ?
      <div className='bg flex gap-4 justify-between px-6 h-16 items-center'>
        <div>
            <Link to="/">Logo</Link>
        </div>
        <div className='flex  gap-2'>
        <Link to="/"  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg'>
            Home
        </Link>
        <br />
        <Link to='products'  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg'>
            product
        </Link>
        <Link to="/ContactUs" className='hover:bg-black hover:text-white px-4 py-1 rounded-lg'>ContactUs</Link>
        <Link to="/SignIn"  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg'>SignIn</Link>
        <Link to='/Login'  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg'>Login</Link>
        </div>
      </div>
      
      :
      <div className='bg-blue-500 flex gap-4 justify-between px-6 h-16 items-center'>
        <div>
            <Link to="/">Logo</Link>
        </div>
        <div className='flex  gap-2'>
        
        <Link to="/addCategorie"  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg'>addCategorie</Link>
        <Link to='/addProductForm'  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg'>Add Product</Link>
        <Link to="/signin"  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg'>Logout</Link>
        <Link to='/Users'  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg'>Users</Link>
     
        </div>
      </div>
      }
        
        
    </div>
  )
}
export default Navbar
