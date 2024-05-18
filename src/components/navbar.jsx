import React , {useContext, useEffect, useState} from 'react'
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
import { contextProviderInfo } from '../context/ContextProvider';
import { CgProfile } from "react-icons/cg";
import { RiHome2Fill } from "react-icons/ri";

export const Navbar = (props) => {
  const location = useLocation();
  const {userExist ,result , setResult,search , setSearch , login , setLogin  , SetUserExist} = useContext(contextProviderInfo)
  const [Products , setProducts  ] = useState([]);
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
    setResult(results)
  },[search])
  // If the current path is /Login, don't render the Navbar
  if (location.pathname === '/SignIn' || location.pathname==="/Login") {
    return null;
  }
  return (
    <div className='fixed top-0 z-20 '>
      {props.item ?
      <div className='bg flex gap-4 justify-between px-6 h-16 items-center  bg-black text-white w-screen'>
        <div>
        <Link to="/"><img src={logo} alt="" className='size-20' /></Link>
        </div>
        <div className='relative'>
          <Link to="/Search">
          <FaSearch className='absolute text-black top-2 left-3 cursor-pointer text-xl ' />
          </Link>
        <input type="text" className='w-120 h-8 rounded-2xl outline-none text-black px-12' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>

        <div className='flex  gap-2 items-center'>
        <br />
        <Link to='categorie'  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg hover:opacity-80'>
        Categorie
        </Link>
        <Link to="/ContactUs" className='hover:bg-black hover:text-white px-4 py-1 rounded-lg hover:opacity-80'>ContactUs</Link>
        <Link to="/cart" className='hover:bg-black hover:text-white px-4 py-1 rounded-lg hover:opacity-80 ml-20'><FaShoppingCart /></Link>
        {login ?
        
        <Link to="/profile"  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg hover:opacity-80 text-3xl'><CgProfile /></Link>
        :
        <div>
          <Link to="/SignIn"  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg hover:opacity-80'>SignIn</Link>
          <Link to='/Login'  className='hover:bg-black hover:text-white px-4 py-1 rounded-lg hover:opacity-80'>Login</Link>
        </div>
        
        }
        
        </div>
      </div>
      
      :
      <div className='bg-black text-white flex flex-col    px-6 h-screen  items-center '>
        <div>
            <Link to="/"><img src={logo} alt="" className='size-32' /></Link>
        </div>
        <div className='flex  gap-6 flex-col mt-2 '>
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
