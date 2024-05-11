import React, { useEffect ,useContext } from 'react'
import defaultPhoto from '../../../public/defaultProfile.webp'
import { contextProviderInfo } from '../../context/ContextProvider'
const Profile = () => {
    const {clientdata   ,login } = useContext(contextProviderInfo)
   
    console.log(clientdata)
  return (
    <div className='mt-16  shadow-2xl h-72 rounded-2xl flex w-full'>
        <div className='shadow-xl p-4 flex flex-col items-center'>
        <img src={defaultPhoto} className='size-24 rounded-full ' alt="" />
        <div className='text-2xl '>{clientdata.username}</div>
        <div className='text-sm text-gray-300 '>{clientdata.email}</div>
        <div className=' whitespace-nowrap -ml-2 mt-8 bg-black rounded-xl text-white px-3 cursor-pointer w-44 text-center'>change password</div>
        <div className=' whitespace-nowrap -ml-2 mt-4  w-44 shadow-xl border  rounded-2xl px-3 cursor-pointer text-center'>change Photo</div>

        </div>
        <div className='flex gap-10  w-full '>
            
            <div className=' flex justify-around w-full mt-12'>
                <div>
                    recent shopped item
                </div>
                <div>
                    wishlist
                </div>
                <div>
                    
                </div>
            </div>

        </div>
        

        
        
    </div>
  )
}

export default Profile