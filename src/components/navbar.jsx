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

const Navbar = (props) => {
  const location = useLocation();
  const { setResult, search, setSearch, login, setLogin, clientdata } = useContext(contextProviderInfo);
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

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
  }, [clientdata]);

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
      {props.item ? (
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
                {/* Uncomment if you want a logout button
                <button className='hover:text-blue-500 px-4 py-1 rounded-lg hover:opacity-80 text-xl' onClick={() => { setLogin(false); localStorage.setItem('isLoggedIn', 'false'); }}>Logout</button>
                */}
              </>
            ) : (
              <div>
                <Link to="/SignIn" className='hover:text-blue-500 px-4 py-1 rounded-lg hover:opacity-80'>SignIn</Link>
                <Link to='/Login' className='hover:text-blue-500 px-4 py-1 rounded-lg hover:opacity-80'>Login</Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='flex'>
          <div className={`bg-black text-white flex flex-col px-6 h-screen items-center transition-all duration-300 ${sidebarExpanded ? 'w-44' : 'w-16'}`}>
            <div className='my-12'>
              <button onClick={toggleSidebar} className='text-2xl'>
                <FiMenu />
              </button>
            </div>
            <div className='flex gap-6 flex-col mt-4'>
              <Link to='/' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/') ? 'bg-gray-700' : ''}`}>
                <RiHome2Fill />
                {sidebarExpanded && <span>Dashboard</span>}
              </Link>
              <Link to='/Users' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/Users') ? 'bg-gray-700' : ''}`}>
                <FaUser />
                {sidebarExpanded && <span>Users</span>}
              </Link>
              <Link to="/categories" className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/categories') ? 'bg-gray-700' : ''}`}>
                <BiSolidCategoryAlt />
                {sidebarExpanded && <span>Categories</span>}
              </Link>
              <Link to='/addProductForm' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/addProductForm') ? 'bg-gray-700' : ''}`}>
                <MdAddCircle />
                {sidebarExpanded && <span>Add Book</span>}
              </Link>
              <Link to='/Books' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/Books') ? 'bg-gray-700' : ''}`}>
                <FaBook />
                {sidebarExpanded && <span>Books</span>}
              </Link>
              <Link to='/Reviews' className={`hover:opacity-80 hover:text-white px-4 py-1 rounded-lg flex items-center gap-2 ${isActive('/Reviews') ? 'bg-gray-700' : ''}`}>
                <MdOutlineReviews />
                {sidebarExpanded && <span>Reviews</span>}
              </Link>
            </div>
          </div>
          <div className='flex-1'>
            {/* Add the rest of your main content here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
