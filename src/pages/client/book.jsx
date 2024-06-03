import React, { useEffect, useState ,useContext } from 'react'
import { useParams } from 'react-router-dom'
import { contextProviderInfo } from '../../context/ContextProvider';
import { FaStar } from "react-icons/fa";
import { GrUp } from "react-icons/gr";
import { GrDown } from "react-icons/gr";
import Reviews from './reviews';
import axios from 'axios';
const Book = () => {
    const [loading, setLoading] = useState(true)
    const { book } = useParams();
    const [bookI, setBookI] = useState([]);
    const [extend, setExtend] = useState(false);
    const {clientdata } = useContext(contextProviderInfo);
    const [payeditems , setPayedimtes ] = useState();
    const [reviews , setReviews ] = useState();
    useEffect(() => {
        
        const bookInfo = async () => {
            const response = await fetch("http://localhost/ecommerce%20project/client/Product.php");
            const jsson = await response.json();
            const responses = await fetch("http://localhost/ecommerce%20project/client/payedItems.php");
            const res = await responses.json();
            const pay = res.map((e)=>e.productid)
            setBookI(jsson)
            setPayedimtes(pay)

            setLoading(false)
        }
       
        const bookRate=async()=>{
            const response = await fetch("http://localhost/ecommerce%20project/client/bookRate.php");
            const res  = await response.json();
            setReviews(res)
        }
        bookRate();
        bookInfo();

    }, [])
    
    const filterBook = bookI.filter(e => e.name === book);
    
        const addToCart = async ()=>{
            const clientid = parseInt(clientdata);
            const productid = parseInt(filterBook[0].productid);
            console.log(productid)
            const response = await axios.post("http://localhost/ecommerce%20project/client/cart.php" ,{clientid ,productid: productid} ) ;
            console.log(response)
        }
        
      
    return (
        <div className='mt-28'>
            {loading ?
                <div role="status" className=' flex justify-center  items-center bg-black h-screen -mt-28 '>
                    <svg aria-hidden="true" class="w-20 h-20 text-center text-gray-200 animate-spin dark:text-gray-600 fill-gray-300" viewBox="0 0 100 101" fill="none"  >
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                :
                <div>       
    {filterBook.map((bk) => {
        const filterReview = reviews.filter((e)=>e.productid === bk.productid)
                    return <>
                        <div className='ml-20 flex gap-4 mb-12'>
                            <div>
                                <img className='h-96 shadow-2xl  sticky top-28' src={`http://localhost/ecommerce%20project/admin/${bk.images}`} alt="" />

                            </div>
                            <div className='w-2/4 mx-auto'>
                                <div className='text-xl w-full '>{bk.autheur}</div>

                                <div className='flex justify-between w-120 items-center '>
                                    <div className='text-4xl'>{bk.name}</div>

                                </div>
                                <div className='mt-4  flex items-center'>
                                {
  filterReview && filterReview.length > 0 ?
  <div className='flex'>{[...Array(5)].map((e , index)=>{return <FaStar className={`${filterReview[0].rate>index && 'text-blue-500'}`}/>})}</div>
  :
  <div className='flex'>{[...Array(5)].map((e , index)=>{return <FaStar/>})}</div>
}
<div className='text-black'>
  {filterReview && filterReview.length > 0 ? filterReview[0].rate : '0.0'}
</div>

                                </div>
                                <div className='text-4xl mt-12 '>{bk.price}.00$</div>
                                {payeditems.includes(bk.productid)
                                 ?<div><a href={bk.link}><button onClick={addToCart} className='bg-blue-500 text-white px-8 py-2 text-3xl rounded-2xl mt-12 w-full hover:bg-opacity-90 shadow-2xl'>
                                    Download
                                </button></a> 
                                </div>
                                : <div><button onClick={addToCart} className='bg-black text-white px-8 py-2 text-3xl rounded-2xl mt-12 w-full hover:bg-opacity-90 shadow-2xl'>
                                    Add to Cart
                                </button>
                                <div className='w-full  flex justify-center '>
                                    <button className='border px-8 py-2 text-xl rounded-2xl mt-6 hover:bg-gray-100  shadow-xl' >
                                        Add to wishlist
                                    </button>
                                </div></div>
                                }
                                
                                
                                <div>
                                    <div className={`${extend && 'line-clamp-3'} mt-12`}>
                                        {bk.description}
                                    </div>
                                    <button className='w-full mx-auto text-gray-400 '>
                                        {extend ?
                                            <div onClick={() => setExtend(false)} ><GrDown className='mx-auto' /></div> :
                                            <div onClick={() => setExtend(true)}><GrUp className='mx-auto' /></div>
                                        }
                                    </button>
                                </div>

                            </div>



                        </div>


                    </>
                })}
            <Reviews productid={parseInt(filterBook[0].productid)} />
            </div>
    }


        </div>
    )
}

export default Book