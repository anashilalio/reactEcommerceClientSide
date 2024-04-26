import React from 'react'
import { Link } from 'react-router-dom'
export const Navbar = (props) => {
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
        <Link to="/Login">Login</Link>
        </div>
      </div>
      :
      <div className='bg-blue-500 flex gap-4 justify-between px-6 h-16 items-center'>
        <div>
            <Link to="/">Logo</Link>
        </div>
        <div className='flex  gap-2'>
        
        
        <Link to='/addProductForm'>Add Product</Link>
        <Link to="/Login">Logout</Link>
        </div>
      </div>
      }
        
        
    </div>
  )
}
export default Navbar
