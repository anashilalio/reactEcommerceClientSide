import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBook } from "react-icons/fa";
import { BiSolidCategory, BiSolidCategoryAlt } from "react-icons/bi";
import { MdAddCircle, MdOutlineReviews } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiHome2Fill } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import logo from '../../public/textLogo.png';
import logow from '../../public/whitelogo.png';
import { contextProviderInfo } from '../context/ContextProvider';
import { IoIosNotifications } from "react-icons/io";
import { IoMdExit } from "react-icons/io";
import { BsArchiveFill } from "react-icons/bs";

const Navbar = (props) => {
  const location = useLocation();
  const { setResult, search, setSearch, login, setLogin, clientdata , userRole  , setUserRole } = useContext(contextProviderInfo);
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [profile , setProfile ] = useState(false)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost/ecommerce%20project/client/Product.php");
        const json = await res.json();
        setProducts(json);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const getImage = async () => {
      try {
        const response = await fetch("http://localhost/ecommerce%20project/admin/usersList.php");
        const users = await response.json();
        const user = users.find(e => parseInt(e.clientid) === parseInt(clientdata));
        if (user) setImage(user.photo);
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    fetchProducts();
    getImage();

    setLoading(false);
  }, [clientdata , login ,userRole]);

  useEffect(() => {
    const results = products.filter((e) => e.name.toLowerCase().includes(search));
    setResult(results);
  }, [search, products, setResult]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (location.pathname === '/SignIn' || location.pathname === "/Login") {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='fixed top-0 z-20 overflow-hidden'>
      {userRole === 'client' ? (
        <div className={`bg flex gap-4 justify-between px-6 h-16 items-center w-screen text-xl font-bold ${scrolled ? 'bg-white border-b-2' : 'bg-transparent'}`}>
          <div>
            <Link to="/"><img src={logo} alt="" className='h-8' /></Link>
          </div>
          <div className='relative'>
            <Link to='products/HORROR' className='hover:text-green-500 px-4 py-1 rounded-lg hover:opacity-80'>Catégories</Link>
            <Link to="/ContactUs" className='hover:text-green-500 px-4 py-1 rounded-lg hover:opacity-80'>Contactez-nous</Link>
          </div>
          <div className='flex gap-2 items-center'>
            <Link to="/cart" className='hover:text-green-500 px-4 py-1 rounded-lg hover:opacity-80 ml-20'><FaShoppingCart /></Link>
            {login ? (
              <>
                <Link to="/profile" className='hover:text-blue-500 px-4 py-1 rounded-lg hover:opacity-80 text-3xl overflow-hidden'>
                  <img className='size-10 rounded-full shadow-xl' src={`http://localhost/ecommerce%20project/client/${image}`} alt="" />
                </Link>
               
              </>
            ) : (
              <div>
                <Link to="/SignIn" className='hover:text-green-500 px-4 py-1 rounded-lg hover:opacity-80'>S'inscrire</Link>
                <Link to='/Login' className='hover:opacity-60 px-4 py-1 rounded-lg text-white rounded-lg bg-green-600'>se connecter</Link>
              </div>
            )}
          </div>
        </div>
      ) : userRole==='admin' ?(
        <div className='flex'>
          <div className={`bg-black text-white flex flex-col px-6 h-screen items-center transition-all duration-300 ${sidebarExpanded ? 'w-56' : 'w-16'}`}>
            <div className='my-12'>
              <button onClick={toggleSidebar} className='text-2xl'>
                <FiMenu />
              </button>
            </div>
            <div className='flex gap-6 flex-col mt-4'>
              <Link to='/' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/') ? 'bg-gray-700' : ''}`}>
                <RiHome2Fill />
                {sidebarExpanded && <span>Tableau de bord</span>}
              </Link>
              <Link to='/Users' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/Users') ? 'bg-gray-700' : ''}`}>
                <FaUser />
                {sidebarExpanded && <span>Comptes</span>}
              </Link>
              <Link to='/WaitingBooks' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/WaitingBooks') ? 'bg-gray-700' : ''}`}>
                <BsArchiveFill />
                {sidebarExpanded && <span>Livres en attente</span>}
              </Link>
              <Link to="/categories" className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/categories') ? 'bg-gray-700' : ''}`}>
                <BiSolidCategoryAlt />
                {sidebarExpanded && <span>Catégories</span>}
              </Link>
              <Link to='/addProductForm' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/addProductForm') ? 'bg-gray-700' : ''}`}>
                <MdAddCircle />
                {sidebarExpanded && <span>Ajouter un livre</span>}
              </Link>
              <Link to='/Books' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/Books') ? 'bg-gray-700' : ''}`}>
                <FaBook />
                {sidebarExpanded && <span>Livres</span>}
              </Link>
              <Link to='/Reviews' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/Reviews') ? 'bg-gray-700' : ''}`}>
                <MdOutlineReviews />
                {sidebarExpanded && <span>Avis</span>}
              </Link>
              <button className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 `}
              onClick={() => { setLogin(false); localStorage.setItem('isLoggedIn', 'false'); setUserRole('client') ;  localStorage.setItem('userData' , 'false') ;navigate("/") ;}}>
                <IoMdExit/>  {sidebarExpanded && <span>Logout</span>}</button>

            </div>
          </div>
          <div className='flex-1'>
            {/* Add the rest of your main content here */}
          </div>
        </div>
      ) : (
        
        <div className=''>
            <div className='fixed w-44 h-20  right-2 top-2  flex gap-8'>
                  <div className='relative' ><IoIosNotifications className='size-10 cursor-pointer'/>
                  <div className=' bg-red-500 w-3 h-3 rounded-full absolute top-0 right-2'></div>
                  </div>

                  <div onClick={()=>setProfile((e)=>!e)}>
                    <CgProfile className='size-10 cursor-pointer'/>
                    {profile && 
                                        <div className='w-36 h-36 pt-4  bg-white shadow-xl relative right-28 rounded-xl text-center'>
      <Link to='/Profile' className='hover:text-orange-500  hover:opacity-80 h-10 text-xl   w-full'>Profile</Link>
       <button className='hover:text-orange-500   hover:opacity-80 pl-8 py-2 text-xl flex items-center border border-b-2 w-full' onClick={() => { setLogin(false); localStorage.setItem('isLoggedIn', 'false'); setUserRole('client') ;  localStorage.setItem('userData' , 'false');  navigate("/") ;}}><IoMdExit/> Logout</button>

                                        </div>

                    }
                    </div>

            </div>
          <div className={`bg-orange-700 text-white flex flex-col px-6 h-screen items-center transition-all duration-300 ${sidebarExpanded ? 'w-56' : 'w-16'}`}>
            <div className='my-12'>
              <button onClick={toggleSidebar} className='text-2xl'>
                <FiMenu />
              </button>
            </div>
            <div className='flex gap-6 flex-col mt-4'>
              <Link to='/' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/') ? 'bg-gray-700' : ''}`}>
                <RiHome2Fill />
                {sidebarExpanded && <span>Tableau de bord</span>}
              </Link>
              
              <Link to='/addBook' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/addProductForm') ? 'bg-gray-700' : ''}`}>
                <MdAddCircle />
                {sidebarExpanded && <span>Ajouter un livre</span>}
              </Link>
              <Link to='/Books' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/Books') ? 'bg-gray-700' : ''}`}>
                <FaBook />
                {sidebarExpanded && <span>Livres</span>}
              </Link>
              

            </div>
          </div>
          </div>
      )}
    </div>
  );
};

export default Navbar;
