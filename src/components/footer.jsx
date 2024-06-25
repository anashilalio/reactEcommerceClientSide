import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='w-screen h-44 bg-black  text-white'>
      <div className='flex pt-12  h-36 justify-around'>
      <div className='flex gap-12 text-2xl font-semibold  pt-4 '>
            <Link to='/contactus'>
              contactus
            </Link>
            <Link to='/products/HORROR'>
              categorie
            </Link>
        </div>
        <div>
          <p className='text-center text-2xl font-semibold'>Follow us on</p>
          <div className='flex justify-center gap-4 pt-4'>
            <Link to='/'>
            <FaFacebook className='size-12'/>
            </Link>
            <Link to='/'>
            <FaInstagram className='size-12'/>
            </Link>
            <Link to='/'>
            <FaTwitter className='size-12'/>
            </Link>
          </div>
        </div>
      </div>
       
        <div className='text-center'>
          @ copyright 2024
        </div>
    </div>
  )
}

export default Footer