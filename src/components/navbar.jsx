import React , {useContext, useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdAddCircle } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import logo from '../../public/textLogo.png';
import logoDashboard from '../../public/textLogo.png'

import { FaShoppingCart } from "react-icons/fa";
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
  console.log(image)
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
      const respon = await fetch("http://localhost/ecommerce%20project/admin/usersList.php")
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
  const [scrolled, setScrolled] = React.useState(false);

React.useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 150);
  };

  document.addEventListener('scroll', handleScroll);
  return () => {
    // Clean up the event listener
    document.removeEventListener('scroll', handleScroll);
  };
}, []); 

  console.log(image)
  return (
    <div className='fixed top-0 z-20 overflow-hidden'>
      {props.item ?
      <div className={`bg flex gap-4 justify-between px-6 h-16 items-center  w-screen   text-xl font-bold ${scrolled ? 'bg-white border-b-2' : 'bg-transparent'}`} >
        <div>
        <Link to="/"><img src={logo} alt="" className=' h-8 ' /></Link>
        </div>
        <div className='relative'>
        <Link to='products/HORROR'  className='hover:text-green-500 px-4 py-1 rounded-lg hover:opacity-80'>
        Categorie
        </Link>
        <Link to="/ContactUs" className='hover:text-green-500 px-4 py-1 rounded-lg hover:opacity-80'>ContactUs</Link>

        </div>

        <div className='flex  gap-2 items-center'>
        <br />
        
        <Link to="/cart" className='hover:text-green-500  px-4 py-1 rounded-lg hover:opacity-80 ml-20'><FaShoppingCart /></Link>
        {login ?
        <>
           <Link to="/profile"  className='hover:text-blue-500  px-4 py-1 rounded-lg hover:opacity-80 text-3xl overflow-hidden'><img className='size-10 rounded-full shadow-xl' src={`http://localhost/ecommerce%20project/client/${image}`}  alt="" /></Link>
        {/* <button   className='hover:text-blue-500  px-4 py-1 rounded-lg hover:opacity-80 text-xl' onClick={()=>{setLogin(localStorage.setItem('isLoggedIn' , 'false'));}}>logout</button> */}
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
      <div className='bg-green-800 text-white  flex flex-col    px-6 h-screen  items-center '>
        <div>
            <Link to="/"><img src={logoDashboard} alt="" className='w-32 my-12' /></Link>
        </div>
        <div className='flex  gap-6 flex-col -mt-4 '>
        <Link to='/'  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><RiHome2Fill />dashboard</Link>
        <Link to='/Users'  className=' hover:opacity-80 px-4 py-1 rounded-lg flex items-center gap-2'><FaUser />Users</Link>
        <Link to="/categories"  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><BiSolidCategoryAlt/>categories</Link>
        <Link to='/addProductForm'  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><MdAddCircle />Add Book</Link>
        <Link to='/Books'  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><FaBook />Books</Link>
        <Link to='/Reviews'  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2'><MdOutlineReviews />Reviews</Link>




        {/* <Link to="/signin"  className='hover:opacity-80 hover:text-white px-4 py-1 rounded-lg  flex items-center gap-2'><IoLogOut />Logout</Link> */}
        
        
     
        </div>
      </div>
      }
        
        
    </div>
  )
}
export default Navbar
