import React, { useEffect, useState , useContext } from 'react'

import { FaStar } from "react-icons/fa";
import ClientReviews from './ClientREviews';
import axios from 'axios';
import { contextProviderInfo } from '../../context/ContextProvider';
const Reviews = ({productid}) => {
    const [hover , setHover ] = useState(1);
    const [comment , setComment  ] = useState('');
    // const [name , setName ] = useState('');
    const [ clientreview , setClientreview]= useState([])
    const {clientdata } = useContext(contextProviderInfo)
    const [reviews  , setReviews ] = useState([]);
    const [reviewAdded , setReviewAdded] = useState(0);
    const [userInfo , setUserInfo] = useState();
    const [reviewExist, setReviewExist] = useState(reviews.some(e => e.userId === clientdata));

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
            const rate = parseInt(hover+1)
            const send= await axios.post("http://localhost/ecommerce%20project/client/reviews.php" , {review : comment , 
                clientid : clientid,productid : productid , rate : rate , dat : dat

             })
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
            setReviewExist(reviews.some(e => e.userId == clientdata));

            getReviews();
            
        },[reviewAdded , reviews, clientdata])

        let rate5 = 0;
        let rate4 = 0;
        let rate3 = 0;
        let rate2 = 0;
        let rate1 = 0;


  return (
        <div className='w-4/5 mx-auto mt-56 '>
                <h1 className='text-3xl font-bold'>Reviews</h1>
                <div className='flex flex-col gap-10 mb-10'>
                   {reviews.map((e)=>{
                    return <ClientReviews  review={e.comments} name={e.username} rate={e.rate} dat={e.dat} photo={e.photo}/>

                   })} 
                    
                </div>
                
                    {/* <input type="text" className='w-full outline-none border ' value={name} onChange={(e)=>setName(e.target.value)}/> */}
                    {!reviewExist && 
                    <div>
                        <form onSubmit={add}>
                    addrReview
                    <div className='flex items-center'>
                    {[...Array(5)].map((star ,index)=>{
                        return <>
                        
                        <FaStar className={`cursor-pointer ${ hover >= index ? 'text-green-500' : '' }`} onMouseEnter={()=>setHover(index) } />
                        </>
                        
                    })}
                    ({hover+1})
                    </div>
                            <textarea type="text" className='w-full outline-none rounded-2xl shadow border p-4 h-28' value={comment} onChange={(e)=>setComment(e.target.value)}/>
                    <div className='mb-4 w-full '>
                    <input type="submit" className='cursor-pointer bg-green-600 text-white px-4 rounded-2xl text-xl relative hover:opacity-65' style={{left:"91%"}} onClick={()=>sendReview()}/>

                    </div>
                    </form>
                    </div>
                    }
                    
                
            </div>
  )
}

export default Reviews