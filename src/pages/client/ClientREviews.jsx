import React from 'react'
import defaultPhoto from '../../../public/defaultProfile.webp'
import { FaStar } from "react-icons/fa";

const ClientREviews = ({review , name ,rate ,dat}) => {
    return (
        <div className='shadow-md rounded-xl py-4 px-4 bg-gray-50'>
            <div className=' '>
                <div className='flex gap-8 items-center'>
                    <img src={defaultPhoto} alt="" className='size-10 rounded-full h-full' />
                    <div className='text-2xl'>
                        {name}
                        <div>
                        
                        </div>
                        
                    </div>
 

                </div>
                <div className='flex items-center mt-2'>
                            {[...Array(5)].map((e , index)=>{
                                return <FaStar className={`${rate>index ? 'text-blue-500' : 'text-black'} `} />
                            })}
                            
                           <p className='ml-4 text-gray-400'>{dat}</p> 
                </div>
                <div className='mt-4'>{review}</div>
            </div>

        </div>
    )
}

export default ClientREviews