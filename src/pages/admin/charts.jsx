import React  ,{useEffect , useState} from 'react'
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,BarChart,Bar, ResponsiveContainer,LineChart ,Line } from 'recharts';
const Charts = () => {
 
  const [earning ,setEarning ] = useState();
const [month , setMonth ] = useState([]);
const [users , setUsers ] = useState([]);
const [totalEarning , setTotalEarning]= useState(0);
const [todayEarning , setTodayEarning]= useState(0);

     useEffect(()=>{
        const usersInfo = async ()=>{
            let res = await fetch("http://localhost/ecommerce%20project/admin/Users.php");
            let jsson = await res.json();
            const month = jsson.map((user)=>{
              return user.joined.slice(5, 7)
          })
          setMonth(month)
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
   
console.log(totalEarning)
const counts = {};
    month.forEach((m) => {
      counts[m] = (counts[m] || 0) + 1;
    });
    const data = Object.entries(counts).map(([name, user]) => ({ name, user })).reverse();


    const renderLineChart = (
      <LineChart  width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="user" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    );
    const renderLineCharts = (
      <LineChart width={280} height={100} data={earning} >
      <Line className='text-black' type="monotone" dataKey="earnings" fill="white" stroke='gray' />
      <XAxis dataKey="month"  fill="orange" stroke='black'/>
      <Tooltip />
    </LineChart>
    );
    const renderLineChar = (
      <LineChart   width={280} height={100} data={data}>
        <Line  className='text-black' type="monotone" dataKey="user" stroke="lightblue" />
                  
        <Tooltip />
      </LineChart>
    );
    const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
      return <text x={x + width / 2} y={y} fill="orange" height={200} textAnchor="middle" dy={-6}>{`${value}`}</text>;
    };
    const renderBarChartss = (
      <BarChart className='-mt-24' width={280} height={170} data={data}>

        <Bar dataKey="user" barSize={30} fill="orange"
           label={renderCustomBarLabel}/>
           
      </BarChart>
    );
    
  return (
    <div className='ml-72'>
      <div className='text-3xl  font-mono font-bold mt-8'>hello , Welcome Again</div>
      <div className='sales info mt-12 flex gap-20 text-white text-xl font-mono font-bold  '>
        <div className="todayEarning bg-gradient-to-r relative from-blue-700 to-blue-500 w-72 h-44 rounded-xl shadow-2xl px-10 py-8">
          <div className='te text-lg index-10'>total earning</div>
            <div className='  text-2xl'>{totalEarning}DH</div>
            <div className='-mt-2 -ml-10'>{renderLineCharts}</div>
            <div className='absolute right-20 bottom-20 text-3xl'><FaArrowCircleUp /></div>

        </div>
        <div className="todayEarning bg-gradient-to-r bg-opacity-85 relative from-red-700 to-red-500 w-72 h-44 rounded-xl shadow-2xl px-10 py-10">
        <div className='te text-lg'>today earning</div>
            <div className='mt-2  text-2xl'>{todayEarning}DH</div>
            <div className='absolute right-20 bottom-20 text-3xl'><FaArrowCircleDown /></div>

        </div>
        <div className="todayEarning bg-gradient-to-r bg-opacity-85 relative from-orange-600 to-orange-500 w-72 h-44 rounded-xl shadow-2xl px-10 py-10">
        <div className='te text-lg z-10'>total users</div>
            <div className='mt-2  text-2xl'>10</div>
            <div className='-mt-6 -ml-10'>{renderBarChartss}</div>
            <div className='absolute right-20 bottom-20 text-3xl'><FaArrowCircleUp /></div>
        </div>
      </div>
      <div className='mt-12 -ml-12 flex'>
        <div>
        <div className='ml-32 text-4xl font-mono font-extrabold mb-2 '>Number of users</div>
      <div className='shadow-2xl'>      {renderLineChart}
</div>
        </div>
       <div className='recent'>
          <div className='ml-32 text-4xl font-mono font-extrabold mb-2'>recent Orders</div>
       </div>

      </div>
      <div>
     <div>
      
     </div>
      </div>
    </div>
  )
}

export default Charts