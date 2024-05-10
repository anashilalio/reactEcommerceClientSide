import React, { useState } from 'react'

import { FaStar } from "react-icons/fa";
import ClientReviews from './ClientREviews';

const Reviews = () => {
    const [hover , setHover ] = useState(0);
    const [comment , setComment  ] = useState('');
    // const [name , setName ] = useState('');
    const [ clientreview , setClientreview]= useState([])
    
    const add =(e)=>{
        e.preventDefault();
        const reviewss = {name : 'name' , review : hover+1 , comment : comment}

        return setClientreview([...clientreview , reviewss])
    }
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
                   {clientreview.map((e)=>{
                    return <ClientReviews name={e.name} review={e.review} comment={e.comment} />

                   })} 
                    
                </div>
                <form onSubmit={add}>
                    addrReview
                    <div className='flex items-center'>
                    {[...Array(5)].map((star ,index)=>{
                        return <>
                        
                        <FaStar className={`cursor-pointer ${ hover >= index ? 'text-orange-500' : '' }`} onMouseEnter={()=>setHover(index) } />
                        </>
                        
                    })}
                    ({hover+1})
                    </div>
                    {/* <input type="text" className='w-full outline-none border ' value={name} onChange={(e)=>setName(e.target.value)}/> */}

                    <textarea type="text" className='w-full outline-none border ' value={comment} onChange={(e)=>setComment(e.target.value)}/>
                    <input type="submit" className='cursor-pointer'/>
                </form>
            </div>
  )
}

export default Reviews