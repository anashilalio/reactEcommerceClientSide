import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { contextProviderInfo } from '../../context/ContextProvider';
import { FaStar } from "react-icons/fa";
import { GrUp, GrDown } from "react-icons/gr";
import Reviews from './reviews';
import axios from 'axios';
import { FaHeart } from "react-icons/fa6";

const Book = () => {
  const { id } = useParams();
  const { clientdata } = useContext(contextProviderInfo);
  const [loading, setLoading] = useState(true);
  const [bookI, setBookI] = useState([]);
  const [extend, setExtend] = useState(false);
  const [payeditems, setPayedItems] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const productsResponse = await fetch("http://localhost/ecommerce%20project/client/Product.php");
        const products = await productsResponse.json();

        const payedItemsResponse = await fetch("http://localhost/ecommerce%20project/client/payedItems.php");
        const payedItemsData = await payedItemsResponse.json();

        const clientPayedItems = payedItemsData
          .filter(item => parseInt(item.clientid) === parseInt(clientdata))
          .map(item => item.productid);

        setBookI(products);
        setPayedItems(clientPayedItems);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost/ecommerce%20project/client/bookRate.php");
        const rates = await response.json();
        setReviews(rates);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchBookData();
    fetchReviews();
    setLoading(false);
  }, [clientdata]);

  const filterBook = bookI.filter(e => e.productid === id);

  const addToCart = async () => {
    try {
      const clientid = parseInt(clientdata);
      const productid = parseInt(filterBook[0].productid);
      const response = await axios.post("http://localhost/ecommerce%20project/client/cart.php", { clientid, productid });
      console.log(response);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <div role="status" className="flex justify-center items-center bg-black h-screen">
        <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin fill-gray-300" viewBox="0 0 100 101" fill="none">
          <path d="M100 50.591C100 78.205 77.614 100.591 50 100.591C22.386 100.591 0 78.205 0 50.591C0 22.977 22.386 0.591 50 0.591C77.614 0.591 100 22.977 100 50.591ZM9.081 50.591C9.081 73.19 27.401 91.509 50 91.509C72.599 91.509 90.919 73.19 90.919 50.591C90.919 27.992 72.599 9.672 50 9.672C27.401 9.672 9.081 27.992 9.081 50.591Z" fill="currentColor" />
          <path d="M93.968 39.041C96.393 38.404 97.862 35.912 97.008 33.554C95.293 28.823 92.871 24.369 89.817 20.348C85.845 15.119 80.883 10.724 75.212 7.413C69.542 4.102 63.275 1.94 56.77 1.051C51.767 0.368 46.698 0.447 41.735 1.279C39.261 1.693 37.813 4.198 38.45 6.623C39.087 9.049 41.569 10.472 44.05 10.107C47.851 9.549 51.719 9.527 55.54 10.049C60.864 10.777 65.993 12.546 70.633 15.255C75.274 17.965 79.335 21.562 82.585 25.841C84.918 28.912 86.8 32.291 88.181 35.876C89.083 38.216 91.542 39.678 93.968 39.041Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="mt-28">
      {filterBook.map((bk) => {
        const filterReview = reviews.filter(e => e.productid === bk.productid);

        return (
          <div key={bk.productid} className="ml-20 flex gap-32 mb-12">
            <div>
              <img className="h-120 shadow-2xl w-96 sticky top-28 rounded-xl" src={`http://localhost/ecommerce%20project/admin/${bk.images}`} alt={bk.name} />
            </div>
            <div className="w-2/4 mx-auto">
              <div className="text-xl w-full opacity-70">{bk.autheur}</div>
              <div className="flex justify-between w-120 items-center">
                <div className="text-4xl font-bold">{bk.name}</div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className={`${filterReview[0]?.rate > index && 'text-green-500'}`} />
                  ))}
                </div>
                <div className="text-black ml-2">
                  {filterReview[0]?.rate || '0.0'}
                </div>
              </div>
              <div className="text-4xl mt-12">{bk.price}.00DH</div>
              {payeditems.includes(bk.productid) && clientdata ? (
                <div>
                  <a href={`http://localhost/ecommerce%20project/admin/uploads/${bk.link}`}>
                    <button className="bg-green-500 text-white px-8 py-2 text-3xl rounded-2xl mt-12 w-full hover:bg-opacity-90 shadow-2xl">
                      Download
                    </button>
                  </a>
                </div>
              ) : (
                <div className='flex items-center mt-12 gap-12'>
                  <button onClick={addToCart} className="bg-black text-white px-44 py-2 text-3xl rounded-xl  w-full hover:bg-opacity-90 shadow-2xl">
                    Add to Cart
                  </button>
                  <div className="">
                    <button className="   ">
                    <FaHeart className='size-12 hover:opacity-70'/>
                    </button>
                  </div>
                </div>
              )}
              <div>
                <div className={`${extend ? '' : 'line-clamp-3'} mt-12`}>
                  {bk.description}
                </div>
                <button className="w-full mx-auto text-gray-400" onClick={() => setExtend(!extend)}>
                  {extend ? <GrDown className="mx-auto" /> : <GrUp className="mx-auto" />}
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <Reviews productid={parseInt(filterBook[0]?.productid)} />
    </div>
  );
};

export default Book;
