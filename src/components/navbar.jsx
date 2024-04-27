import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = (props) => {
  const location = useLocation();

  // If the current path is /Login, don't render the Navbar
  if (location.pathname === '/SignIn' || location.pathname==="/Login") {
    return null;
  }
  return (
    <div>
      {props.item ?
      <div className='bg-blue-500 flex gap-4 justify-between px-6 h-16 items-center'>
        <div>
            <Link to="/">Logo</Link>
        </div>
        <div className='flex  gap-2'>
        <Link to="/">
            Home
        </Link>
        <br />
        <Link to='products'>
            product
        </Link>
        <Link to="/ContactUs">ContactUs</Link>
        <Link to="/SignIn">SignIn</Link>
        <Link to='/Login'>Login</Link>
        </div>
      </div>
      
      :
      <div className='bg-blue-500 flex gap-4 justify-between px-6 h-16 items-center'>
        <div>
            <Link to="/">Logo</Link>
        </div>
        <div className='flex  gap-2'>
        
        
        <Link to='/addProductForm'>Add Product</Link>
        <Link to="/signin">Logout</Link>
        <Link to='/Users'>Users</Link>
        </div>
      </div>
      }
        
        
    </div>
  )
}
export default Navbar
