import React, { useEffect ,useContext, useState } from 'react'
import defaultPhoto from '../../../public/defaultProfile.webp'
import { contextProviderInfo } from '../../context/ContextProvider'
import axios from 'axios'
import { IoMdPhotos } from "react-icons/io";

const Profile = () => {
    const {clientdata   ,login ,setLogin } = useContext(contextProviderInfo)
    const [wishlist , setWishlist ] = useState([]);
    const [image,setImage ] = useState();
    const [user , setUser ] = useState();
    const [change , setChange ] = useState();
    const [previewImage , setPreviewImage ] = useState();
   useEffect(()=>{
    const getwishlist =async()=>{
        const clientid = parseInt(clientdata); 
        const response = await axios.post("http://localhost/ecommerce%20project/client/getWishlist.php" , {clientid : clientid});
        const jssson  = response.data;
        console.log(jssson)
        const promises = jssson.map(async (i) => {
            const responses = await fetch("http://localhost/ecommerce%20project/client/Product.php");
            const resp = await responses.json();
            return resp.find(element => element.productid === i.productid);
          });
        const respon = await fetch("http://localhost/ecommerce%20project/admin/usersList.php")
        const users = await respon.json();
        const userr = users.filter((e)=>parseInt(e.clientid) === parseInt(clientdata))
        console.log(userr)
          setUser(userr[0].photo)
          const wishlistItems = await Promise.all(promises);
          setWishlist(wishlistItems.filter(item => item)); 
    }
    
    getwishlist();
    
   },[clientdata])
   const SubmitFile =(e)=>{
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
       console.log(e.target.files[0])
   }
   const changePhoto=async()=>{
        
    const formData = new FormData();
        formData.append('image', image);
        formData.append('clientid', clientdata);
        const response = await axios.post('http://localhost/ecommerce%20project/client/changePhoto.php', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          
   }
   const logout=()=>{
    localStorage.removeItem('userData');
    setLogin(localStorage.setItem('isLoggedIn' , 'false'))
   }
   console.log(change)
  return (
    <div className='mt-16  shadow-2xl rounded-2xl flex w-full'>
        <div className='shadow-xl p-4 flex flex-col items-center'  >
            <div className= {`relative size-24 ${change && 'opacity-35'}`} onMouseEnter={(e)=>setChange(true)} onMouseLeave={(e)=>setChange(false)}>
                {previewImage ? 
                   <img src={previewImage} className='size-24 rounded-full '  onMouseEnter={(e)=>setChange(true)} />

                :                     <img src={`http://localhost/ecommerce%20project/client/${user}`} className='size-24 rounded-full '  onMouseEnter={(e)=>setChange(true)} />

            }
            {change &&            <label  className='absolute top-6 left-6 cursor-pointer'htmlFor='fileUp' ><IoMdPhotos className='size-12 text-white' />
        </label>}
            </div>
        <div className='text-2xl '>{clientdata.username}</div>
        <div className='text-sm text-gray-300 '>{clientdata.email}</div>
        <button   className='hover:text-blue-500  px-4 py-1 rounded-lg hover:opacity-80 text-xl' onClick={()=>logout()}>logout</button>
        
        <input type="file" id='fileUp' className=' hidden' onChange={SubmitFile}/>
        <div onClick={()=>changePhoto()} className=' bg-blue-500 text-white px-8 mt-4 w-full text-center rounded-xl cursor-pointer'>submit</div>
        </div>
        <div className='  w-full '>
            
            <div className='flex flex-col justify-center items-center  w-full mt-12'>
                
                <div className='text-center'>
                    <div className='text-xl font-bold'>wishlist</div>
                    
                    <div className='flex gap-4 mb-12'>
                        {wishlist.map((wishl)=>{
                            return <div className='h-32 w-20 rounded shadow-lg overflow-hidden  '>
                                <img src={`http://localhost/ecommerce%20project/admin/${wishl.images}`} className='w-full  h-full' alt="" />

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