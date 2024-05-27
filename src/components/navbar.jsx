import React , {useContext, useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdAddCircle } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import logo from '../../public/logo.png';
import logoDashboard from '../../public/logoBlack.png'

import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { contextProviderInfo } from '../context/ContextProvider';
import { CgProfile } from "react-icons/cg";
import { RiHome2Fill } from "react-icons/ri";

export const Navbar = (props) => {
  const location = useLocation();
  const {  setResult,search , setSearch , login , setLogin ,clientdata } = useContext(contextProviderInfo)
  const [Products , setProducts  ] = useState([]);
  const [image , setImage ] = useState();
  useEffect(()=>{
    async function fetchProducts() {
      let res = await fetch("http://localhost/ecommerce%20project/client/Product.php");
      let json = await res.json();
      setProducts(json)
    }
    fetchProducts();
    
    const results = Products.filter((e)=>{
      return e.name.toLowerCase().includes(search);
    })
    const getImage=async()=>{
      const respon = await fetch("http://localhost/ecommerce%20project/admin/Users.php")
      const users = await respon.json();
      const userr = users.filter((e)=>parseInt(e.clientid) === parseInt(clientdata))
      console.log(userr)
      setImage(userr[0].photo)
    }
    getImage();

    setResult(results)
  },[search])
  // If the current path is /Login, don't render the Navbar
  if (location.pathname === '/SignIn' || location.pathname==="/Login") {
    return null;
  }
  console.log(image)
  return (
    <div className='fixed top-0 z-20 '>
      {props.item ?
      <div className='bg flex gap-4 justify-between px-6 h-16 items-center  w-screen bg-white shadow' >
        <div>
        <Link to="/"><img src={logo} alt="" className='size-44 mt-6 -ml-4' /></Link>
        </div>
        <div className='relative'>
          <Link to="/Search">
          <FaSearch className='absolute text-black top-2 left-3 cursor-pointer text-xl ' />
          </Link>
        <input type="text" className='w-120 h-8 rounded-2xl outline-none text-black px-12 border' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>

        <div className='flex  gap-2 items-center'>
        <br />
        <Link to='categorie'  className='hover:text-blue-500 px-4 py-1 rounded-lg hover:opacity-80'>
        Categorie
        </Link>
        <Link to="/ContactUs" className='hover:text-blue-500 px-4 py-1 rounded-lg hover:opacity-80'>ContactUs</Link>
        <Link to="/cart" className='hover:text-blue-500  px-4 py-1 rounded-lg hover:opacity-80 ml-20'><FaShoppingCart /></Link>
        {login ?
        <>
           <Link to="/profile"  className='hover:text-blue-500  px-4 py-1 rounded-lg hover:opacity-80 text-3xl overflow-hidden'><img className='size-10 rounded-full shadow-xl' src={`http://localhost/ecommerce%20project/client/${image}`}  alt="" /></Link>
        <button   className='hover:text-blue-500  px-4 py-1 rounded-lg hover:opacity-80 text-xl' onClick={()=>{setLogin(localStorage.setItem('isLoggedIn' , 'false'));}}>logout</button>
        </>
       

        :
        <div>
          <Link to="/SignIn"  className='hover:text-blue-500  px-4 py-1 rounded-lg hover:opacity-80'>SignIn</Link>
          <Link to='/Login'  className='hover:text-blue-500  px-4 py-1 rounded-lg hover:opacity-80'>Login</Link>
        </div>
        
        }
        
        </div>
      </div>
      
      :
      <div className='bg-blue-800 text-white  flex flex-col    px-6 h-screen  items-center '>
        <div>
            <Link to="/"><img src={logoDashboard} alt="" className='size-44' /></Link>
        </div>
        <div className='flex  gap-6 flex-col -mt-4 '>
        <Link to='/'  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><RiHome2Fill />dashboard</Link>
        <Link to='/Users'  className=' hover:opacity-80 px-4 py-1 rounded-lg flex items-center gap-2'><FaUser />Users</Link>
        <Link to="/addCategorie"  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><BiSolidCategory/>addCategorie</Link>
        <Link to="/categories"  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><BiSolidCategoryAlt/>categories</Link>
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
