import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { FaStar, FaHeart, FaSearch } from 'react-icons/fa';
import { IoCart } from 'react-icons/io5';
import axios from 'axios';
import { contextProviderInfo } from '../../context/ContextProvider';
import Categorie from './Categorie';

const Search = ({ search, products }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchLower = search.toLowerCase();
    const filteredResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchLower) ||
      product.autheur?.toLowerCase().includes(searchLower) ||
      product.categorie.toLowerCase().includes(searchLower)
    );
    setResults(filteredResults);
  }, [search, products]);

  return (
    <div className='mt-4 flex flex-wrap gap-12 text-center'>
      {results.map((product) => (
        <div key={product.productid} className='w-56 relative'>
          <Link to={`/products/categorie/${product.name}/${product.productid}`}>
            <img src={`http://localhost/ecommerce%20project/admin/${product.images}`} alt={product.name} className='w-full h-72 rounded-xl' />
          </Link>
          <div className={`absolute transition-all duration-50 top-2 right-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white hover:bg-black`}>
            <IoCart />
          </div>
          <div className={`absolute transition-all duration-50 top-2 left-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white`}>
            <FaHeart />
          </div>
          <h1 className='text-xl font-extrabold text-center font-mono'>{product.name}</h1>
          <h3 className='text-xl text-center'>{product.categorie}</h3>
          <div className='flex justify-center'>
            {[...Array(5)].map((_, index) => <FaStar key={index} color='orange' />)}
          </div>
          <h3 className='text-xl text-center'>{product.price} DH</h3>
        </div>
      ))}
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const { search, setSearch, clientdata } = useContext(contextProviderInfo);
  const { categorie } = useParams();
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost/ecommerce%20project/client/Product.php");
      const json = await res.json();
      setProducts(json);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (querySearch) {
      setSearch(querySearch);
      setSearched(true);
    }
  }, [querySearch, setSearch]);

  const handleSearchClick = () => {
    setSearched(true);
    setSearchParams({ search });
  };

  const handleCategoryClick = () => {
    setSearched(false);
    setSearch('');
    setSearchParams({});
  };

  const filteredProducts = products.filter(product => product.categorie === categorie);

  const addToCart = async (productId) => {
    const clientid = parseInt(clientdata, 10);
    await axios.post("http://localhost/ecommerce%20project/client/cart.php", { clientid, productid: productId });
  };

  const addToWishlist = async (productId) => {
    const clientid = parseInt(clientdata, 10);
    await axios.post("http://localhost/ecommerce%20project/client/wishlist.php", { clientid, productid: productId });
  };

  return (
    <div className="h-full">
      <div className='relative w-2/4 ml-96 mt-16'>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='w-full h-12 outline-none rounded-full border px-6 shadow'
        />
        <FaSearch className='absolute top-2 right-6 cursor-pointer text-3xl' onClick={handleSearchClick} />
      </div>
      <div className='flex'>
        <Categorie onCategoryClick={handleCategoryClick} />
        <div className="products ml-96 mt-12 flex flex-wrap gap-12">
          {searched ? (
            <Search search={search} products={products} />
          ) : (
            <div className="flex flex-wrap gap-12 pb-12">
              {filteredProducts.map((product) => (
                <div key={product.productid} className='w-56 cursor-pointer transition-all duration-150 relative'>
                  <Link to={`/products/categorie/${product.name}/${product.productid}`}>
                    <img src={`http://localhost/ecommerce%20project/admin/${product.images}`} alt={product.name} className='w-full h-72 rounded-xl' />
                  </Link>
                  <div onClick={() => addToCart(product.productid)} className='absolute transition-all duration-50 top-2 right-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white hover:bg-black'>
                    <IoCart />
                  </div>
                  <div onClick={() => addToWishlist(product.productid)} className='absolute transition-all duration-50 top-2 left-2 text-slate-800 text-lg bg-gray-300 bg-opacity-70 rounded-full p-1 hover:text-white'>
                    <FaHeart />
                  </div>
                  <h1 className='text-xl font-extrabold text-center font-mono'>{product.name}</h1>
                  <h3 className='text-xl text-center'>{product.categorie}</h3>
                  <div className='flex justify-center'>
                    {[...Array(5)].map((_, index) => <FaStar key={index} color='orange' />)}
                  </div>
                  <h3 className='text-xl text-center'>{product.price} DH</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
