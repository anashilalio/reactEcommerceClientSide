import React  ,{useEffect , useState} from 'react'
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import RecentOrders from './recentOrders';
import {  BarChart, LineChart  } from '@mui/x-charts';

const Charts = () => {
 
  const [earning ,setEarning ] = useState([]);
const [month , setMonth ] = useState([]);
const [users , setUsers ] = useState([]);
const [totalEarning , setTotalEarning]= useState(0);
const [todayEarning , setTodayEarning]= useState(0);

     useEffect(()=>{
        const usersInfo = async ()=>{
            let res = await fetch("http://localhost/ecommerce%20project/admin/Users.php");
            let jsson = await res.json();
            
            
          
          setMonth(jsson)
          setUsers(jsson)
        }
        const products=async()=>{
          const res = await fetch("http://localhost/ecommerce%20project/admin/orders.php");
          const resp = await res.json();
          let monthlyEarnings = resp.monthlyEarnings;
          let todayEarnings = resp.todaysEarnings;

          let totalEarn = monthlyEarnings.reduce((total, current) => total + Number(current.earnings), 0);
          let todayEarn = todayEarnings.reduce((total, current) => total + Number(current.earnings), 0);
          setTotalEarning(totalEarn);
          setTodayEarning(todayEarn);
          setEarning(monthlyEarnings);
          
        }
        products();
        usersInfo()
    },[])
   console.log(users)

    console.log(earning)
  return (
    <div className='pl-72 bg-gray-50'>
      <div className='text-3xl  font-mono font-bold pt-8'>hello , Welcome Again</div>
      <div className='sales info mt-12 flex gap-20 text-white text-xl font-mono font-bold  '>
        <div className="todayEarning bg-gradient-to-r relative from-blue-700 to-blue-500 w-72 h-44 rounded-xl shadow-2xl px-10 py-8">
          <div className='te text-lg index-10'>total earning</div>
            <div className='  text-2xl'>{totalEarning}DH</div>
            <div className='-mt-2 -ml-10 '></div>
            <div className='absolute right-20 bottom-20 text-3xl'><FaArrowCircleUp /></div>

        </div>
        <div className="todayEarning bg-gradient-to-r bg-opacity-85 relative from-red-700 to-red-500 w-72 h-44 rounded-xl shadow-2xl px-10 py-10">
        <div className='te text-lg '>today earning</div>
            <div className='mt-2  text-2xl'>{todayEarning}DH</div>
            <div className='absolute right-20 bottom-20 text-3xl'><FaArrowCircleDown /></div>

        </div>
        <div className="todayEarning bg-gradient-to-r bg-opacity-85 relative from-orange-600  to-orange-500 w-72 h-44 rounded-xl shadow-2xl px-10 py-10">
        <div className='te text-lg z-20' >total users</div>
            <div className='mt-2  text-2xl z-50'>10</div>
            <div className='-mt-6 -ml-10'></div>
            <div className='absolute right-20 bottom-20 text-3xl'><FaArrowCircleUp /></div>
        </div>
      </div>
      <div className='mt-12 -ml-12 flex flex-wrap'>
        <div>
        <div className=' text-4xl font-mono font-extrabold mb-2 '>Monthly Earnings</div>
      <div className='shadow-xl'>  
        <LineChart
        xAxis={[{ data: earning.map(e => `Month ${e.month}`), scaleType: 'band' }]}
        series={[{data: earning.map(e=> parseInt(e.earnings))}]}
        width={1000}
       height={300}
  
>

  </LineChart> 
</div>
        </div>
        

      </div>
      <div>
     <div>
      
     </div>
      </div>
      <div className='flex justify-between '>
      <div >
        <BarChart
        xAxis={[{ data: earning.map(e => `Month ${e.month}`), scaleType: 'band' }]}
        series={[{data: earning.map(e=> parseInt(e.earnings))}]}
        width={600}
        height={300}/> 
        </div>
        <div className='recent'>
          <div className=' text-4xl font-mono font-extrabold mb-2'>recent Orders
          <RecentOrders />
          </div>
       </div>
      </div>
      
       
    </div>
  )
}

export default Charts