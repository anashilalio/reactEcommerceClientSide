import React from 'react'
import defaultPhoto from '../../../public/defaultProfile.webp'
import { FaStar } from "react-icons/fa";

const ClientREviews = ({name , comment , review}) => {
    return (
        <div>
            <div className='border-y-2 '>
                <div className='flex gap-8 items-center'>
                    <img src={defaultPhoto} alt="" className='size-10 rounded-full h-full' />
                    <div>
                        {name}
                        <div className='flex text-orange-500'>
                            {[...Array(5)].map((e , index)=>{
                                return <FaStar className={`${review>index ? 'text-orange-500' : 'text-black'} `} />
                            })}

                        </div>
                    </div>
 

                </div>

                <div>{comment}</div>
            </div>

        </div>
    )
}

export default ClientREviews