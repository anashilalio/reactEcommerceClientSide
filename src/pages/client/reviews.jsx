import React, { useEffect, useState , useContext } from 'react'

import { FaStar } from "react-icons/fa";
import ClientReviews from './ClientREviews';
import axios from 'axios';
import { contextProviderInfo } from '../../context/ContextProvider';
const Reviews = ({productid}) => {
    const [hover , setHover ] = useState(0);
    const [comment , setComment  ] = useState('');
    // const [name , setName ] = useState('');
    const [ clientreview , setClientreview]= useState([])
    const {clientdata } = useContext(contextProviderInfo)
    const [reviews  , setReviews ] = useState([]);
    const [reviewAdded , setReviewAdded] = useState(0);
    const [userInfo , setUserInfo] = useState();
    const add =(e)=>{
        e.preventDefault();
        const reviewss = {name : 'name' , review : hover+1 , comment : comment}

        return setClientreview([...clientreview , reviewss])
    }

    
        const sendReview=async ()=>{
            const clientid = parseInt(clientdata); 
            const date = new Date();
            const getMonth = date.getMonth();
            const getYear = date.getFullYear();
            const getDay = date.getDate();
            const dat = `${getYear}-${getMonth+1}-${getDay}`;
            const rate = parseInt(hover)
            const send= await axios.post("http://localhost/ecommerce%20project/client/reviews.php" , {review : comment , 
                clientid : clientid,productid : productid , rate : rate , dat : dat

             })
             console.log(send)
             setReviewAdded((e)=>e+1);
        }
        useEffect(()=>{
            const getReviews = async ()=>{
                const getss = await fetch("http://localhost/ecommerce%20project/client/ClientReview.php");
                const jssson = await getss.json();

                setReviews([])
                jssson.map((e)=>{
                    if(productid === parseInt(e.productid) ){
                        setReviews(p => [...p ,e ]);
                        
                    }
                })
            }
           
            getReviews();
            
        },[reviewAdded])
        
        

  return (

        <div className='w-4/5 mx-auto mt-56 '>
                <div className=' max-w-12 flex gap-32 items-center mb-12 xl:w-full '>
                    <div className='sm:text-sm md:text-3xl xl:text-4xl'>addReviews</div>

                    <div className='flex items-center sm:text-sm md:text-3xl xl:text-4xl'>
                        reviews
                        <div className='flex flex-col  ml-24 text-sm   w-full'>

                            <div className='flex items-center gap-2 '>5 reviews
                                <div className='w-24 bg-gray-400 h-3 flex sm sm:w-12 xl:w-48 md:w-24'>

                                    <div className='bg-blue-400 w-12 sm:w-12 xl:w-12 xl:w-24' >

                                    </div>

                                </div>
                                (2)
                            </div>
                            <div className='flex items-center gap-2'>4 reviews
                                <div className='w-24 bg-gray-400 h-3 flex sm:w-12 xl:w-48 md:w-24'>

                                    <div className='bg-blue-400 w-10 sm:w-6  md:w-10 xl:w-24'>

                                    </div>

                                </div>
                                (5)
                            </div>
                            <div className='flex items-center gap-2'>3 reviews
                                <div className='w-24 bg-gray-400 h-3 flex sm:w-12 xl:w-48 md:w-24'>

                                    <div className='bg-blue-400 w-4 sm:w-6  md:w-10 xl:w-24'>

                                    </div>

                                </div>
                                (5)
                            </div>
                            <div className='flex items-center gap-2'>2 reviews
                                <div className='w-24 bg-gray-400 h-3 flex sm:w-12 xl:w-48 md:w-24'>

                                    <div className='bg-blue-400 w-12 sm:w-6 md:w-10 xl:w-24'>

                                    </div>

                                </div>
                                (3)
                            </div>
                            <div className='flex items-center gap-2 sm:text-sm '>1 reviews
                                <div className=' bg-gray-400 h-3 flex sm:w-12 xl:w-48 md:w-24'>

                                    <div className='bg-blue-400 w-2 sm:w-6 xl:w-24 md:w-10 xl:w-24'>

                                    </div>

                                </div>
                                (1)
                            </div>

                        </div>



                    </div>
                </div>
                <div className='flex flex-col gap-10'>
                   {reviews.map((e)=>{
                    return <ClientReviews  review={e.comments} name={e.username} rate={e.rate} dat={e.dat}/>

                   })} 
                    
                </div>
                <form onSubmit={add}>
                    addrReview
                    <div className='flex items-center'>
                    {[...Array(5)].map((star ,index)=>{
                        return <>
                        
                        <FaStar className={`cursor-pointer ${ hover >= index ? 'text-blue-500' : '' }`} onMouseEnter={()=>setHover(index) } />
                        </>
                        
                    })}
                    ({hover+1})
                    {console.log(hover)}
                    </div>
                    {/* <input type="text" className='w-full outline-none border ' value={name} onChange={(e)=>setName(e.target.value)}/> */}

                    <textarea type="text" className='w-full outline-none border ' value={comment} onChange={(e)=>setComment(e.target.value)}/>
                    <input type="submit" className='cursor-pointer' onClick={()=>sendReview()}/>
                </form>
            </div>
  )
}

export default Reviews