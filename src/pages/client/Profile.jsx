import React, { useEffect ,useContext, useState } from 'react'
import defaultPhoto from '../../../public/defaultProfile.webp'
import { contextProviderInfo } from '../../context/ContextProvider'
import axios from 'axios'
const Profile = () => {
    const {clientdata   ,login } = useContext(contextProviderInfo)
    const [wishlist , setWishlist ] = useState([]);
   useEffect(()=>{
    const getwishlist =async()=>{
        const clientid = parseInt(clientdata.clientid); 
        const response = await axios.post("http://localhost/ecommerce%20project/client/getWishlist.php" , {clientid : clientid});
        const jssson  = response.data;
        const promises = jssson.map(async (i) => {
            const responses = await fetch("http://localhost/ecommerce%20project/client/Product.php");
            const resp = await responses.json();
            return resp.find(element => element.productid === i.productid);
          });
        
          const wishlistItems = await Promise.all(promises);
          setWishlist(wishlistItems.filter(item => item)); 
    }
    getwishlist();
    
   })
  return (
    <div className='mt-16  shadow-2xl h-72 rounded-2xl flex w-full'>
        <div className='shadow-xl p-4 flex flex-col items-center'>
        <img src={defaultPhoto} className='size-24 rounded-full ' alt="" />
        <div className='text-2xl '>{clientdata.username}</div>
        <div className='text-sm text-gray-300 '>{clientdata.email}</div>
        <div className=' whitespace-nowrap -ml-2 mt-8 bg-black rounded-xl text-white px-3 cursor-pointer w-44 text-center'>change password</div>
        <div className=' whitespace-nowrap -ml-2 mt-4  w-44 shadow-xl border  rounded-2xl px-3 cursor-pointer text-center'>change Photo</div>

        </div>
        <div className='  w-full '>
            
            <div className='flex flex-col justify-center items-center  w-full mt-12'>
                <div>
                    recent shopped item
                </div>
                <div className='text-center'>
                    wishlist
                    <div className='flex gap-4'>
                        {wishlist.map((wishl)=>{
                            return <div className='size-24 '>
                                <img src={`http://localhost/ecommerce%20project/admin/${wishl.images}`} className='w-full' alt="" />

                                {wishl.name}
                                {wishl.price}
                            </div>
                        })}
                    </div>
                </div>
                <div>
                    
                </div>
            </div>

        </div>
        

        
        
    </div>
  )
}

export default Profile