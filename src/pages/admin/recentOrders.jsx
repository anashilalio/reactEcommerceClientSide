import React, { useEffect, useState } from 'react'

const RecentOrders = () => {
    const [orders , setOrders  ] = useState([]);
    useEffect(()=>{
        
        const Orders=async()=>{
            const response = await fetch("http://localhost/ecommerce%20project/admin/RecentOrders.php");
            const res =await response.json();
            
            setOrders(res)
        
        }
        Orders();
    })
  return (
    <div className='text-sm pr-4'>
        <div>
            <div>

            </div>
            {orders.map((e , index)=>{
                if(index < 4){
                    return  <div className='grid grid-cols-4 shadow-lg px-4 rounded-xl mb-4 h-12 py-4 overflow-hidden '>
                    <div className=''>{e.clientid}</div>
                    <div className='-mt-2 -ml-12'><img src={`http://localhost/ecommerce%20project/client/${e.photo}`} className='size-8 rounded-full ' alt="" /></div>
                    <div className='-ml-14'>{e.dat}</div>
                    <div className=' line-clamp-1 h-5 grid -ml-8'>{e.name}</div>

                </div>
                }
                
            })}
           
        </div>
    </div>
  )
}

export default RecentOrders